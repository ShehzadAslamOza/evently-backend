const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const refreshToken = asyncHandler(async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: "jwt cookie not found" });
  }
  console.log(cookies);

  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();

  if (!foundUser) return res.sendStatus(StatusCodes.FORBIDDEN);

  console.log(foundUser);

  // Evaluate JWT
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.email !== decoded.UserInfo.email) {
      console.log(decoded);

      console.log(decoded.email);
      return res.sendStatus(StatusCodes.FORBIDDEN);
    }

    // JWT Tokens
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: foundUser.email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60s" }
    );

    res.json({ accessToken });
  });
});

module.exports = { refreshToken };
