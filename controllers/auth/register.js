const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  // Check if all inputs are provided
  if (!firstName || !lastName || !email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Provide with all field" });
  }

  // check for duplicates
  const duplicate = await User.findOne({ email }).exec();
  if (duplicate) {
    return res.status(StatusCodes.CONFLICT).json({ msg: "use already exists" });
  }

  // hashing the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // creating confirmation code
  const confirmationCode = jwt.sign(
    {
      email: email,
    },
    process.env.CONFIRM_TOKEN_SECRET,
    {
      expiresIn: "600s",
    }
  );

  // create and save user
  const result = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    confirmationCode,
  });

  console.log(result);

  // send email

  return res.status(StatusCodes.OK).json({
    msg: `new user ${firstName + " " + lastName + "{" + email + ") created"}`,
  });
});

module.exports = {
  register,
};
