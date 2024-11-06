const express = require('express');
const ratelimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const morgan = require('morgan');
const cors = require('cors');

const todoRouter = require('./routes/todoroute');
const userRouter = require('./routes/userroute');

const app = express();

// Only make use of trust proxy if you are going to be directly coding the web frontend
// app.enable('trust proxy');

app.use(morgan('dev'));

app.use(cors());

app.use(express.json());

app.use(mongoSanitize());

const limiter = ratelimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  // console.log(req.headers);

  next();
});
app.use('/api', limiter);

app.use(xss());

app.use('/api/v1/todo', todoRouter);
app.use('/api/v1/user', userRouter);

module.exports = app;
