const bcrypt = require("bcryptjs");
const User = require("../database/UserSchema");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

const home = async (req, res) => {
  try {
    res.status(200).send("Home page with authorization");
  } catch (err) {
    res.status(400).send({ message: "Page not found" });
  }
};

const register = async (req, res) => {
  try {
    const { fname, lname, phone, email, pass, repass } = req.body;

    // Validation
    if (!fname || !lname || !email || !pass || !repass) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    if (pass !== repass) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (pass.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(pass, 12);
    const user = await User.create({
      fname,
      lname,
      phone,
      email,
      pass: hashedPassword
    });

    const token = generateToken(user._id);

    res.status(201).json({
      message: "Registration Successful",
      token,
      userId: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, pass } = req.body;

    if (!email || !pass) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(pass, user.pass);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login Successful",
      token,
      userId: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = async (req, res) => {
  try {
    // Client should remove the token
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add this to your auth-controller.js
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-pass');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const allowedUpdates = ['fname', 'lname', 'phone', 'bio', 'avatar', 'socialLinks'];
    const isValidOperation = Object.keys(updates).every(update => 
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).json({ message: "Invalid updates!" });
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      updates,
      { new: true, runValidators: true }
    ).select('-pass');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Don't forget to add it to your exports:
module.exports = {
  home,
  register,
  login,
  logout,
  getCurrentUser,
  updateProfile
};