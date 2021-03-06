var path = require('path');
var express = require('express');
var expressValidator = require('express-validator');
var glob = require('glob');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var helmet = require('helmet');
var appRoot = require('app-root-path');
var logger = require(appRoot + '/server/config/logger');
var util = require('util');

module.exports = function(app) {
  var env = process.env.NODE_ENV || 'development';
  app.locals.env = env;

  if (env === 'development') {
    app.locals.pretty = true;
  }

  app.set('views', appRoot + '/server/views');
  app.set('view engine', 'pug');
  app.set('trust proxy', 'loopback');

  app.use(favicon(appRoot + '/client/public/stealie-small.png'));
  app.use(morgan('combined', {'stream': logger.stream}));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(expressValidator());
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(appRoot + '/client/public'));

  app.use(helmet());
  app.use(methodOverride());

  app.use(require(appRoot + '/server/controllers'));

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });


  app.use(function (err, req, res, next) {
    logger.error(err.status || 500 + ' ' + util.inspect(err));

    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: env === 'development' ? err : {},
      title: 'error'
    });
  });

};
