var path = require('path');
var rootPath = path.normalize(__dirname + '/..');
var env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: '<appName>'
    },
    port: 3150,
    db: {
      host: '<db_host>',
      user: '<db_user>',
      password: '<db_password>',
      database: '<db_name>',
      logging: console.log
    },
    redis: {
      host: '127.0.0.1',
      port: 6379,
      option: {}
    },
    session_secret: '<session_secret>'
  },

  test: {
    root: rootPath,
    app: {
      name: '<appName>'
    },
    port: 3150,
    db: {
      host: '<db_host>',
      user: '<db_user>',
      password: '<db_password>',
      database: '<db_name>',
      logging: console.log
    },
    redis: {
      host: '127.0.0.1',
      port: 6379,
      option: {}
    },
    session_secret: '<session_secret>'
  },

  production: {
    root: rootPath,
    app: {
      name: '<appName>'
    },
    port: 3150,
    db: {
      host: '<db_host>',
      user: '<db_user>',
      password: '<db_password>',
      database: '<db_name>'
    },
    redis: {
      host: '127.0.0.1',
      port: 6379,
      option: {}
    },
    session_secret: '<session_secret>'
  },
};

module.exports = config[env];
