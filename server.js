require("dotenv").config();
const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const connectDB = require("./config/connectDB");

const app = express();
const PORT = process.env.PORT || 5000;

// Connecting to MongoDB
connectDB();

// Express middleware for parsing URL-encoded form data
app.use(express.urlencoded({ extended: false }));

// The express.json() middleware is used to parse JSON data in the request body.
app.use(express.json());

// cookie-parser
app.use(cookieParser());

// routes
app.use("/auth", require("./routes/auth"));

// error handler
app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`The server is listening at port ${PORT}`);
  });
});
