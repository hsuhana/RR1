// Import modules
var configs = require("../configs/globals");
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var session = require("express-session");
var passport = require("passport");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");
var http = require("http");
var debug = require("debug")("backend:server");

// Import routes
var indexRouter = require('../routes/index');
var membersRouter = require('../routes/members');
var reservationRouter = require('../routes/reservations');
var authRouter = require('../routes/auth');

// Import models
var Member = require('../models/member');

// Initialize app
var app = express();

// Set up middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: "secretSession",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  },
}));

// Passport config
app.use(passport.initialize());
app.use(passport.session());
passport.use(Member.createStrategy());
passport.serializeUser(Member.serializeUser());
passport.deserializeUser(Member.deserializeUser());

//app.get("/", (req, res) => res.send("Express on Vercel"));

// Routes
app.use('/', indexRouter);
app.use('/members', membersRouter);
app.use('/reservations', reservationRouter);
app.use('/auth', authRouter);

// CORS setup
var cors = require('cors');
app.use(cors());

// Connect to MongoDB
mongoose.connect(configs.ConnectionStrings.MongoDB)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Error handling
app.use((req, res, next) => next(createError(404)));

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.send('error');
});


// Server setup
const port = normalizePort(process.env.PORT || "5001");
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
}

function onError(error) {
  if (error.syscall !== "listen") throw error;
  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}

module.exports = app;
