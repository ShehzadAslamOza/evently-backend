const { login } = require("./auth/login");
const { register } = require("./auth/register");
const { confirmEmail } = require("./auth/confirm");
const { logout } = require("./auth/logout");
const { refreshToken } = require("./auth/refresh");
const { forgotPassword } = require("./auth/forgotPassword");
const { resetPassword } = require("./auth/resetPassword");
const { resendConfirm } = require("./auth/resendConfirm");

module.exports = {
  login,
  register,
  confirmEmail,
  logout,
  refreshToken,
  forgotPassword,
  resetPassword,
  resendConfirm,
};
