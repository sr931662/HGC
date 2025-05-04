const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const educationSchema = new mongoose.Schema({
  institution: {
    type: String,
    required: true,
    trim: true
  },
  degree: {
    type: String,
    required: true,
    trim: true
  },
  fieldOfStudy: {
    type: String,
    required: true,
    trim: true
  },
  startYear: {
    type: Number,
    required: true
  },
  endYear: {
    type: Number
  },
  description: {
    type: String,
    trim: true
  }
});

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  proficiency: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  category: {
    type: String,
    required: true,
    enum: ['technical', 'language', 'soft']
  }
});

const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  issuer: {
    type: String,
    trim: true
  }
});

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    trim: true
  },
  lname: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/
  },
  pass: {
    type: String,
    required: true,
    minlength: 8
  },
  avatar: {
    type: String,
    default: 'https://example.com/default-avatar.jpg'
  },
  bio: {
    type: String,
    trim: true,
    maxlength: 500
  },
  education: [educationSchema],
  skills: [skillSchema],
  achievements: [achievementSchema],
  socialLinks: {
    linkedin: { type: String, trim: true },
    github: { type: String, trim: true },
    twitter: { type: String, trim: true }
  },
  enrollments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Enrollment'
  }],
  role: {
    type: String,
    enum: ['student', 'instructor', 'admin'],
    default: 'student'
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.fname} ${this.lname}`;
});

// Generate JWT token
userSchema.methods.generateToken = async function() {
  return jwt.sign(
    { 
      userId: this._id.toString(), 
      email: this.email,
      role: this.role 
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// Remove sensitive data when sending user object
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.pass;
  delete user.__v;
  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;































// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
// dotenv.config({ path: "./config.env" });

// const userSchema = new mongoose.Schema({
//   fname: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   lname: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   phone: {
//     type: String,
//     required: true,
//     match: /^[0-9]{10}$/
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true
//   },
//   pass: {
//     type: String,
//     required: true,
//   },
//   enrollments: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Enrollment'
//   }]
// }, { timestamps: true });

// userSchema.methods.generateToken = async function () {
//   try {
//     return jwt.sign(
//       { userId: this._id.toString(), email: this.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );
//   } catch (err) {
//     console.error(err);
//     return null;
//   }
// };

// const User = mongoose.model("User", userSchema);
// module.exports = User;