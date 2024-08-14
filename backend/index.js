//setup
const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
//middelware
app.use(express.json());
app.use("/", require("./routes/index"));
//port setup
app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log("something wrong while listening to port");
  } else {
    console.log("listning on port", process.env.PORT);
  }
});

module.exports = app;
