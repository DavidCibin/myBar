const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const session = require("express-session");
const passport = require("passport");
const methodOverride = require("method-override");

// load env variables
require("dotenv").config();

// create the express app
const app = express();

// connect to MongoDB with mongoose
require("./config/database");

// load passport
require("./config/passport");

// require routes
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const drinksRouter = require("./routes/drinks")

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// misc middleware
app.use(methodOverride("_method"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: "lax",
    },
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// router middleware
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/drinks", drinksRouter);

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

app.get('/auth/google/oauth2callback',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
  (req, res) => {
    // This middleware will not be invoked. Passport will redirect to Google.
  }
);

// Callback route after Google has authenticated the user
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }), // Redirect to login page on authentication failure
  (req, res) => {
    // Successful authentication, redirect to the appropriate page (e.g., dashboard)
    res.redirect('/dashboard');
  }
);

// Error handling for OAuth authentication
app.use('/auth/google/oauth2callback', (err, req, res, next) => {
  console.error(err); // Log the error for debugging

  // Handle the error by redirecting the user to the login page
  res.redirect('/login'); // Redirect to login page or handle the error appropriately
});

module.exports = app;
