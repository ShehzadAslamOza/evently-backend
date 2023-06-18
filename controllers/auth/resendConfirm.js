const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const resendConfirm = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide your email" });
  }

  // checking if the user exists
  const findUser = await User.findOne({ email }).exec();

  if (!findUser) {
    res.status(StatusCodes.NOT_FOUND).json({ msg: "User doesn't exist" });
  }

  // If the user is already in active state donot resend
  if (findUser.status === "Active") {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: "User already active" });
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

  findUser.confirmationCode = confirmationCode;
  const result = await findUser.save();

  console.log(result);

  // send email

  res.status(StatusCodes.OK).json({ msg: "Code resent, check your email" });
});

module.exports = { resendConfirm };
