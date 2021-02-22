// External Modules
const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// Routers
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const listsRouter = require("./routes/lists");

// Express
const app = express();

// Enabling cross origin requests
const cors = require("cors");
app.use(cors());

// Body parser
const bodyParser = require("body-parser");
// Express settings
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// View engine
app.set("view engine", "html");

/*    Swagger   */
// Swagger will allow us to both document and test api.
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Branch-It Backend API",
      version: "1.0.0",
    },
  },
  apis: ["routes/index.js", "routes/users.js", "routes/lists.js"], // Files which contain the routes to be documented
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// MongoDB
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27017/branch-it", //Default MongoDB port and local connection
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => {
    console.log("Connected to DB!");
  }
);

// Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/lists", listsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
