const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const User = require("../../models/User");
const bcrypt = require("bcrypt");

const resetPassword = asyncHandler(async (req, res, next) => {
  const email = req.email;
  const { currentPassword, newPassword } = req.body;

  // find user
  const foundUser = await User.findOne({ email }).exec();

  if (!foundUser) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "User not found" });
  }

  // check if current password is correct
  const match = await bcrypt.compare(currentPassword, foundUser.password);

  if (!match) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "password incorrect" });
  }

  // set the new password.
  // hashing the password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  foundUser.password = hashedPassword;
  await foundUser.save();

  return res
    .status(StatusCodes.OK)
    .json({ msg: "password changed successfully" });
});

module.exports = { resetPassword };
