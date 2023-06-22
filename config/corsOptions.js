const allowedOrigins = require("../config/allowedOrigins");

corsOptions = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
