const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const confirmEmail = asyncHandler(async (req, res, next) => {
  const { confirmationCode } = req.params;

  // getting back user based on confirmationCode
  const foundUser = await User.findOne({ confirmationCode }).exec();

  // checking if the user exists
  if (!foundUser) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: "User Not found" });
  }

  let status = StatusCodes.OK;

  // verifying the confirmationCode
  jwt.verify(
    confirmationCode,
    process.env.CONFIRM_TOKEN_SECRET,
    (err, decoded) => {
      if (err || foundUser.username !== decoded.username) {
        status = StatusCodes.UNAUTHORIZED;
      }
    }
  );

  if (status !== StatusCodes.UNAUTHORIZED) {
    foundUser.status = "Active";
    foundUser.confirmationCode = "";
    await foundUser.save();
  }

  
  return res.redirect("http://localhost:3000/login");
});

module.exports = { confirmEmail };
