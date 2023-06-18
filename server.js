require("dotenv").config();
const express = require("express");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

// Express middleware for parsing URL-encoded form data
app.use(express.urlencoded({ extended: false }));

// The express.json() middleware is used to parse JSON data in the request body.
app.use(express.json());

// routes
app.use("/auth", require("./routes/auth"));

// error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`The server is listening at port ${PORT}`);
});
