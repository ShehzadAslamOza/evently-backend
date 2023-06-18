const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");

const refreshToken = asyncHandler(async (req, res, next) => {
  res.status(StatusCodes.OK).json({ msg: "in forgot refreshToken" });
});

module.exports = { refreshToken };
