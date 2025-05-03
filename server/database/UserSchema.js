const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

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
    lowercase: true
  },
  pass: {
    type: String,
    required: true,
  },
  enrollments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Enrollment'
  }]
}, { timestamps: true });

userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      { userId: this._id.toString(), email: this.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
  } catch (err) {
    console.error(err);
    return null;
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;