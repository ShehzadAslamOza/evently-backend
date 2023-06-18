const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  res.status(StatusCodes.OK).json({ email, password });
});

const register = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  res.status(StatusCodes.OK).json({ firstName, lastName, email, password });
});

const logout = asyncHandler(async (req, res, next) => {
  res.status(StatusCodes.OK).json({ msg: "in logout" });
});

const confirmEmail = asyncHandler(async (req, res, next) => {
  res.status(StatusCodes.OK).json({ msg: "in confirm Email" });
});

const forgotPassword = asyncHandler(async (req, res, next) => {
  res.status(StatusCodes.OK).json({ msg: "in forgot Password" });
});

const resetPassword = asyncHandler(async (req, res, next) => {
  res.status(StatusCodes.OK).json({ msg: "in forgot reset Password" });
});

const refreshToken = asyncHandler(async (req, res, next) => {
  res.status(StatusCodes.OK).json({ msg: "in forgot refreshToken" });
});

module.exports = {
  login,
  register,
  confirmEmail,
  logout,
  forgotPassword,
  refreshToken,
  resetPassword,
};
