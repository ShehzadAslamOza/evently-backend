const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const verifyJWT = require("../middleware/verifyJWT");

router.route("/login").post(authController.login);
router.route("/register").post(authController.register);
router.route("/confirm/:confirmationCode").get(authController.confirmEmail);
router.route("/confirm/resend").post(authController.resendConfirm);
router.route("/logout").get(authController.logout);
router.route("/forgotPassword").get(authController.forgotPassword);
router.route("/resetPassword").get(verifyJWT, authController.resetPassword);
router.route("/refresh").get(authController.refreshToken);

module.exports = router;
