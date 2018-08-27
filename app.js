var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");

//views
const indexRouter = require("./routes/index");
const nominationsRouter = require("./routes/nominations");
const carsRouter = require("./routes/cars");
const votesRouter = require("./routes/votes");
const usersRouter = require("./routes/users");
//api
const nominationsApi = require("./routes/api/nominations");
const carsApi = require("./routes/api/cars");
const votesApi = require("./routes/api/votes");
const uploadApi = require("./routes/api/upload");
const dataApi = require("./routes/api/data");
const usersApi = require("./routes/api/users");
const userData = require("./routes/api/userData");

var app = express();

//bodyParser Middleware
app.use(bodyParser.json());
//allow CORS
app.use(cors());
// DB Config
const uri = require("./config/database").mLabURI;
// Connect to Mongo
mongoose
  .connect(uri)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(err => console.log(err));

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function() {
//   console.log("mongodb is open in app");
//   // mongoose.connection.db.collections(function(error, names) {
//   //   if (error) {
//   //     throw new Error(error);
//   //   } else {
//   //     names.map(function(name) {
//   //       console.log("found collection %s", name);
//   //     });
//   //   }
//   // });
// });

// mongoose
//   .connect('mongodb://localhost/nodedb')
//   .then(() => console.log("mongodb connected"))
//   .catch(err => console.log(err));

// let db = mongoose.connection;
// db.on('error', (err) => console.log(err))
// db.once('open', () => console.log('Connecter to mongo db'))
//passport config

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "abcdefg",
    resave: true,
    saveUninitialized: false
  })
);
//passport middleware
// require("./config/passport")(passport);
app.use(passport.initialize());
// app.use(passport.session());
// load passport strategies
const localSignupStrategy = require("./passport/local-signup");
const localLoginStrategy = require("./passport/local-login");
passport.use("local-signup", localSignupStrategy);
passport.use("local-login", localLoginStrategy);
// pass the authenticaion checker middleware
// const authCheckMiddleware = require("./middleware/auth-check");
// app.use("/api", authCheckMiddleware);
// auth route
const authRoute = require("./routes/auth");
app.use("/auth", authRoute);

// app.get("*", (req, res, next) => {
//   // console.log(req.cookies)
//   res.locals.user = req.user || null;
//   next();
// });
// app.use("/users", usersRouter);
// ACCESS LIST
// app.get("*", (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return next();
//   } else {
//     res.redirect("/users/login");
//   }
// });
// ---VIEWS---
app.use("/", indexRouter);
app.use("/nominations", nominationsRouter);
app.use("/cars", carsRouter);
app.use("/votes", votesRouter);
// ---API---
app.use("/api/nominations", nominationsApi);
app.use("/api/cars", carsApi);
app.use("/api/votes", votesApi);
app.use("/api/upload", uploadApi);
app.use("/api/data", dataApi);
app.use("/api/users", usersApi);
app.use("/api/user", userData);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
