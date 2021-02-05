const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const questionsRouter = require('./src/routes/questions');
const usersRouter = require('./src/routes/users');
const resultsRouter = require('./src/routes/results');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());

app.use('/questions', questionsRouter);
app.use('/users', usersRouter);
app.use('/results', resultsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.listen(3000);
