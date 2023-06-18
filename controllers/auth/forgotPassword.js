const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");

const forgotPassword = asyncHandler(async (req, res, next) => {
  res.status(StatusCodes.OK).json({ msg: "in forgot Password" });
});

module.exports = { forgotPassword };
