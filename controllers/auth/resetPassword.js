const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");

const resetPassword = asyncHandler(async (req, res, next) => {
  res.status(StatusCodes.OK).json({ msg: "in forgot reset Password" });
});

module.exports = { resetPassword };
