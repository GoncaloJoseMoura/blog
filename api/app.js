const cors = require('cors');
const express = require('express');
const routes = require('./routes')
const mongoose = require("mongoose");
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const compression = require("compression");
const helmet = require("helmet");
const RateLimit = require("express-rate-limit");

require('dotenv').config()

const app = express();

mongoose.set("strictQuery", false);

const dev_db_url = process.env.MONGODB_URI

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dev_db_url, { useNewUrlParser: true, useUnifiedTopology: true})
}

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
    },
  }),
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression()); // Compress all routes
app.use(cors());

app.use('/users', routes.user);
app.use('/articles', routes.article);
app.use('/comments', routes.comment);

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// app.listen(process.env.PORT, () =>
//   console.log(`Example app listening on port ${process.env.PORT}!`),
// );
