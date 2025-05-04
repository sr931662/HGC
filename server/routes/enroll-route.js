const express = require("express");
const router = express.Router();
const enrollmentController = require("../controllers/enroll-controller");
const authMiddleware = require("../midd/auth-midd");

// Protected routes (require authentication)
router.route("/")
  .post(authMiddleware, enrollmentController.createEnrollment)
  .get(authMiddleware, enrollmentController.getUserEnrollments);

router.route("/:id")
  .get(authMiddleware, enrollmentController.getEnrollmentDetails)
  .put(authMiddleware, enrollmentController.updateEnrollment)
  .delete(authMiddleware, enrollmentController.cancelEnrollment);

module.exports = router;