const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const { sendConfirmationEmail } = require("../../config/nodemailer.config");

const resendConfirm = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide your email" });
  }

  // checking if the user exists
  const foundUser = await User.findOne({ email }).exec();

  if (!foundUser) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "User doesn't exist" });
  }

  // If the user is already in active state donot resend
  if (foundUser.status === "Active") {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "User already active" });
  }

  // resend the code
  const confirmationCode = jwt.sign(
    {
      email: email,
    },
    process.env.CONFIRM_TOKEN_SECRET,
    {
      expiresIn: "600s",
    }
  );

  foundUser.confirmationCode = confirmationCode;
  const result = await foundUser.save();

  console.log(result);

  // send email

  sendConfirmationEmail(
    result.email,
    result.firstName,
    result.confirmationCode
  );

  return res
    .status(StatusCodes.OK)
    .json({ msg: "Code resent, check your email" });
});

module.exports = { resendConfirm };
