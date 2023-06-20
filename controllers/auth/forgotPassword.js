const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const forgotPassword = asyncHandler(async (req, res, next) => {
  res.status(StatusCodes.OK);
});

module.exports = { forgotPassword };
