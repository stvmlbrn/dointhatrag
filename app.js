require('dotenv').config();

var express = require('express');
var db = require('./app/db');

var app = express();

require('./config/express')(app);

db.sequelize
  .sync()
  .then(function () {
    app.listen(process.env.PORT, function () {
      console.log('Express server listening on port ' + process.env.PORT);
    });
  }).catch(function (e) {
    throw new Error(e);
  });

