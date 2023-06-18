const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");

const logout = asyncHandler(async (req, res, next) => {
  res.status(StatusCodes.OK).json({ msg: "in logout" });
});

module.exports = {
  logout,
};
