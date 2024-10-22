//setup
const express = require("express");
const passport = require("passport");
const app = express();
const path = require("path");
const swaggerJsDocs = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const db = require("./config/mongoose");
const passportConfig = require("./config/passport");
db();
const beansAndBiteEmailWorker = require("./queue/beansAndBiteEmailQueue");
//middelware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Beans And Bite",
      version: "1.0.0",
      description: "Beans And Bite API's",
    },
    servers: [
      {
        url: process.env.BACKEND_URL,
      },
    ],
  },

  apis: ["./routes/*.js"],
};
const openapiSpecification = swaggerJsDocs(options);
app.use(
  "/beans-and-bite-api-docs",
  swaggerUi.serve,
  swaggerUi.setup(openapiSpecification)
);

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
