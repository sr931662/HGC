const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth-controller")
const authMiddleware = require("../midd/auth-midd")

router.route("/").get(authController.home)

router.route("/sign-up").post(authController.register)

router.route("/login").post(authController.login)

// Add this route with the middleware
router.route("/me")
  .get(authMiddleware, authController.getCurrentUser)
  .patch(authMiddleware, authController.updateProfile);

module.exports = router