const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  res.status(StatusCodes.OK).json({ email, password });
});

module.exports = { login };
