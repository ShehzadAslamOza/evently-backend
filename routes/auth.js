const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const verifyJWT = require("../middleware/verifyJWT");

router.route("/login").post(authController.login);
router.route("/register").post(authController.register);
router.route("/confirm/:confirmationCode").get(authController.confirmEmail);
router.route("/logout").get(authController.logout);
router.route("/forgotPassword").get(authController.forgotPassword);
router.route("/refresh").get(authController.refreshToken);
router.route("/confirm/resend").post(authController.resendConfirm);

// protected route
router.route("/resetPassword").post(verifyJWT, authController.resetPassword);

module.exports = router;
