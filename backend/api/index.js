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
var MongoStore = require('connect-mongo');
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

// CORS setup
//var cors = require('cors');
//app.use(cors());
var cors = require('cors');

// CORS configuration
app.use(cors({
  origin: 'https://rr-1-uwof.vercel.app',  // Replace with your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],  // Add any other headers if necessary
  credentials: true, // Allow credentials (cookies or authorization headers)
}));

//Handle preflight requests manually if needed
app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://rr-1-uwof.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);  // Respond with 200 OK for preflight requests
});

// Set up middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(session({
//   secret: "secretSession",
//   resave: false,
//   saveUninitialized: false,
//   store: MongoStore.create({ mongoUrl: process.env.CONNECTION_STRING_MONGODB }),
//   cookie: {
//     secure: true,
//     maxAge: 24 * 60 * 60 * 1000, // 1 day
//   },
// }));

const isProduction = process.env.NODE_ENV === 'production';

app.use(session({
  secret: "secretSession",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.CONNECTION_STRING_MONGODB }),
  cookie: {
    secure: isProduction,   // Use secure cookies only in production
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,  // 1 day
    sameSite: isProduction ? 'None' : 'Lax',  // 'None' for cross-site cookies
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

require('dotenv').config();

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
