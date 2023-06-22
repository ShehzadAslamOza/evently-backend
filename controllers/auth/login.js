const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "send both email and passwords" });
  }

  // finding the user
  const foundUser = await User.findOne({ email }).exec();

  if (!foundUser) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "user not found" });
  }

  const match = await bcrypt.compare(password, foundUser.password);

  if (!match) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "password incorrect" });
  }

  if (foundUser.status !== "Active") {
    return res
      .status(StatusCodes.PARTIAL_CONTENT)
      .json({ firstName: foundUser.firstName, lastName: foundUser.lastName, email: foundUser.email, status: foundUser.status});
  }

  // JWT Tokens
  const accessToken = jwt.sign(
    {
      UserInfo: {
        _id: foundUser._id,
        email: foundUser.email,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30d" }
  );

  // Refresh Tokens
  const refreshToken = jwt.sign(
    {
      UserInfo: {
        email: foundUser.email,
      },
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "30d" }
  );

  // setting refresh token
  foundUser.refreshToken = refreshToken;
  await foundUser.save();

  // setting accesstoken as cookie
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.status(StatusCodes.OK).json(
    {_id: foundUser._id, firstName: foundUser.firstName, lastName: foundUser.lastName, email: foundUser.email, status: foundUser.status,accessToken });
});

module.exports = { login };
