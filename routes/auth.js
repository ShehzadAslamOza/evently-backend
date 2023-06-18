const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.route("/login").post(authController.login);
router.route("/register").post(authController.register);
router.route("/confirm").get(authController.confirmEmail);
router.route("/logout").get(authController.logout);
router.route("/forgotPassword").get(authController.forgotPassword);
router.route("/resetPassword").get(authController.resetPassword);
router.route("/refresh").get(authController.refreshToken);

module.exports = router;
