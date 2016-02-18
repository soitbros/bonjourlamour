var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var multiparty = require('connect-multiparty');

var config = require('../_config');

var app = express();

multipartyMiddleware = multiparty();

var mainRoutes = require('./routes/index');
var authRoutes = require('./routes/auth');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));

mongoose.connect(config.MONGOLAB_URI);

app.use('/', mainRoutes);
app.use('/auth', multipartyMiddleware, authRoutes);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    var status = err.status || 500;
    res.status(status).send({
      message: err.message,
      error: err
    });
  });
}
app.use(function(err, req, res, next) {
  var status = err.status || 500;
  res.status(status).send({
    message: err.message,
    error: err
  });
});

module.exports = app;
