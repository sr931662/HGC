const Enrollment = require("../database/EnrollmentSchema");
const User = require("../database/UserSchema");
const { validationResult } = require('express-validator');

const createEnrollment = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.userId;
    const enrollmentData = req.body;

    // Create new enrollment
    const newEnrollment = await Enrollment.create({
      user: userId,
      ...enrollmentData
    });

    // Add enrollment to user's enrollments array
    await User.findByIdAndUpdate(
      userId,
      { $push: { enrollments: newEnrollment._id } }
    );

    res.status(201).json({
      success: true,
      message: "Enrollment created successfully",
      enrollment: newEnrollment
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false,
      message: "Failed to create enrollment",
      error: error.message 
    });
  }
};

const getUserEnrollments = async (req, res) => {
  try {
    const userId = req.userId;
    
    const enrollments = await Enrollment.find({ user: userId })
      .sort({ enrollmentDate: -1 });

    res.status(200).json({
      success: true,
      count: enrollments.length,
      enrollments
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch enrollments",
      error: error.message
    });
  }
};

const getEnrollmentDetails = async (req, res) => {
  try {
    const enrollmentId = req.params.id;
    const userId = req.userId;

    const enrollment = await Enrollment.findOne({
      _id: enrollmentId,
      user: userId
    });

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found"
      });
    }

    res.status(200).json({
      success: true,
      enrollment
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch enrollment details",
      error: error.message
    });
  }
};

const updateEnrollment = async (req, res) => {
  try {
    const enrollmentId = req.params.id;
    const userId = req.userId;
    const updateData = req.body;

    const enrollment = await Enrollment.findOneAndUpdate(
      { _id: enrollmentId, user: userId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Enrollment updated successfully",
      enrollment
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update enrollment",
      error: error.message
    });
  }
};

const cancelEnrollment = async (req, res) => {
  try {
    const enrollmentId = req.params.id;
    const userId = req.userId;

    // Update enrollment status to cancelled
    const enrollment = await Enrollment.findOneAndUpdate(
      { _id: enrollmentId, user: userId },
      { status: 'cancelled' },
      { new: true }
    );

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found"
      });
    }

    // Remove enrollment from user's enrollments array
    await User.findByIdAndUpdate(
      userId,
      { $pull: { enrollments: enrollmentId } }
    );

    res.status(200).json({
      success: true,
      message: "Enrollment cancelled successfully",
      enrollment
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to cancel enrollment",
      error: error.message
    });
  }
};

module.exports = {
  createEnrollment,
  getUserEnrollments,
  getEnrollmentDetails,
  updateEnrollment,
  cancelEnrollment
};