var express = require('express');
var glob = require('glob');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var passport = require('passport');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var helmet = require('helmet');

module.exports = function(app, config) {
  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';
  app.locals.assetsFolder = env === 'development' ? 'src' : 'dist';

  if (env === 'development') {
    app.locals.pretty = true;
  }

  app.set('views', config.root + '/app/views');
  app.set('view engine', 'jade');

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + '/public'));

  app.use(helmet());
  app.use(methodOverride());
  app.use(session({
    store: new RedisStore({host: config.redis.host, port: config.redis.port}),
    secret: config.session_secret,
    resave: true,
    saveUnitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  require(config.root + '/config/passport')(passport);

  // make sure the user is logged in before accessing anything
  app.use(function(req, res, next) {
    if (!req.isAuthenticated() && req.url !== '/login') {
      res.redirect('/login');
    } else {
      next();
    }
  });

  app.route('/login')
    .post(passport.authenticate('WindowsAuthentication', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
    }));

  app.use(require(config.root + '/app/controllers'));

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if(app.get('env') === 'development'){
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
      });
  });

};