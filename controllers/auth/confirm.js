const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");

const confirmEmail = asyncHandler(async (req, res, next) => {
  res.status(StatusCodes.OK).json({ msg: "in confirm Email" });
});

module.exports = { confirmEmail };
