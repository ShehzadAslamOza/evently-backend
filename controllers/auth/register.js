const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");

const register = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  res.status(StatusCodes.OK).json({ firstName, lastName, email, password });
});

module.exports = {
  register,
};
