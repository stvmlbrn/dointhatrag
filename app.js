require('dotenv').config();

var appRoot = require('app-root-path');
var express = require('express');

var app = express();

require(appRoot + '/app/config/express')(app);

app.listen(process.env.PORT, function() {
  console.log('Express server listening on port ' + process.env.PORT);
});
