const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const enrollmentSchema = new mongoose.Schema({
  // Reference to the user who enrolled
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Course information
  course: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    duration: {
      type: String,
      required: true
    },
    topics: {
      type: [String],
      required: true
    },
    startDate: {
      type: Date,
      default: new Date('2025-05-15') // Default start date from your form
    },
    endDate: {
      type: Date,
      default: new Date('2025-08-07') // Default end date from your form
    }
  },
  
  // Personal information
  personalInfo: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    education: {
      type: String,
      required: true
    },
    emergencyContact: {
      name: {
        type: String,
        required: true
      },
      phone: {
        type: String,
        required: true
      },
      relation: {
        type: String,
        required: true
      }
    }
  },
  
  // Payment information
  payment: {
    method: {
      type: String,
      enum: ['credit-card', 'paypal', 'apple-pay'],
      required: true
    },
    details: {
      // Different payment details based on method
      cardName: String,
      cardNumber: String, // Should be encrypted in production
      expiryDate: String,
      cvv: String,       // Should be encrypted in production
      saveCard: Boolean
    },
    amount: {
      type: Number,
      required: true
    },
    registrationFee: {
      type: Number,
      default: 50
    },
    totalAmount: {
      type: Number,
      required: true
    },
    paymentDate: {
      type: Date,
      default: Date.now
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'completed'
    }
  },
  
  // Schedule information
  schedule: {
    selectedDay: String,
    timeSlots: [{
      day: String,
      time: String
    }],
    timezone: {
      type: String,
      enum: ['ET', 'CT', 'MT', 'PT', 'Other'],
      default: 'ET'
    }
  },
  
  // Terms and conditions
  termsAgreed: {
    type: Boolean,
    required: true,
    default: false
  },
  
  // Enrollment status
  status: {
    type: String,
    enum: ['pending', 'active', 'completed', 'cancelled'],
    default: 'pending'
  },
  
  // Additional metadata
  enrollmentDate: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  notes: String
}, { timestamps: true });

// Update the lastUpdated field before saving
enrollmentSchema.pre('save', function(next) {
  this.lastUpdated = new Date();
  next();
});

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
module.exports = Enrollment;