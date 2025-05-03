const mongoose = require('mongoose');
const { Schema } = mongoose;

const programSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Program title is required'],
    trim: true,
    maxlength: [100, 'Program title cannot exceed 100 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Program category is required'],
    enum: {
      values: ['Academic', 'Career', 'Leadership', 'International', 'Other'],
      message: 'Please select a valid category'
    }
  },
  description: {
    type: String,
    required: [true, 'Program description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  detailedDescription: {
    type: String,
    required: [true, 'Detailed description is required']
  },
  duration: {
    value: {
      type: Number,
      required: [true, 'Duration value is required']
    },
    unit: {
      type: String,
      enum: ['weeks', 'months', 'days'],
      default: 'weeks'
    }
  },
  schedule: {
    sessionsPerWeek: Number,
    sessionDuration: Number, // in hours
    format: {
      type: String,
      enum: ['in-person', 'online', 'hybrid'],
      default: 'in-person'
    }
  },
  price: {
    type: Number,
    required: [true, 'Program price is required'],
    min: [0, 'Price must be at least 0']
  },
  discountPrice: {
    type: Number,
    validate: {
      validator: function(value) {
        return value < this.price;
      },
      message: 'Discount price must be less than regular price'
    }
  },
  capacity: {
    type: Number,
    required: [true, 'Program capacity is required'],
    min: [1, 'Capacity must be at least 1']
  },
  image: {
    url: String,
    altText: String
  },
  curriculum: [{
    week: Number,
    title: String,
    topics: [String],
    learningOutcomes: [String]
  }],
  instructors: [{
    type: Schema.Types.ObjectId,
    ref: 'Instructor'
  }],
  testimonials: [{
    studentName: String,
    studentImage: String,
    position: String,
    testimonial: String,
    rating: {
      type: Number,
      min: 1,
      max: 5
    }
  }],
  faqs: [{
    question: String,
    answer: String
  }],
  isFeatured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for duration display
programSchema.virtual('durationDisplay').get(function() {
  return `${this.duration.value} ${this.duration.unit}`;
});

// Virtual for price display
programSchema.virtual('priceDisplay').get(function() {
  return `$${this.price.toFixed(2)}`;
});

// Virtual for discount display
programSchema.virtual('discountDisplay').get(function() {
  return this.discountPrice ? `$${this.discountPrice.toFixed(2)}` : null;
});

// Middleware to update updatedAt timestamp
programSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Middleware to create slug from title
programSchema.pre('save', function(next) {
  if (!this.isModified('title')) return next();
  
  this.slug = this.title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove non-word chars
    .replace(/\s+/g, '-')      // Replace spaces with -
    .replace(/--+/g, '-');     // Replace multiple - with single -
  
  next();
});

// Static method for program categories
programSchema.statics.getCategories = function() {
  return [
    'Academic',
    'Career',
    'Leadership',
    'International',
    'Other'
  ];
};

// Indexes for better performance
programSchema.index({ title: 'text', description: 'text' });
programSchema.index({ category: 1 });
programSchema.index({ price: 1 });
programSchema.index({ isFeatured: 1 });
programSchema.index({ isActive: 1 });

const Program = mongoose.model('Program', programSchema);

module.exports = Program;