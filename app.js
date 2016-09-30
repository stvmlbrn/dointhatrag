require('dotenv').config();

var appRoot = require('app-root-path');
var express = require('express');
var db = require(appRoot + '/app/db');

var app = express();

require(appRoot + '/app/config/express')(app);

db.sequelize
  .sync()
  .then(function () {
    app.listen(process.env.PORT, function () {
      console.log('Express server listening on port ' + process.env.PORT);
    });
  }).catch(function (e) {
    throw new Error(e);
  });

