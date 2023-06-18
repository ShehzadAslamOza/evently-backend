const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({ msg: "The api is working so far woohoo" });
});

app.listen(PORT, () => {
  console.log(`The server is listening at port ${PORT}`);
});
