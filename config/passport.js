var WindowsStrategy = require('passport-windowsauth');
//var db = require('../app/models');
var config = require('./config');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user._json.extensionAttribute1); //use employee number to serialize req.user session
  });

  passport.deserializeUser(function(id, done) {
    /* db.Staff
      .find({
        where: {employeeNumber: id}
      })
      .then(function(user) {
        done(null, user);
      }); */
  });

  passport.use(new WindowsStrategy({
    ldap: config.ldap,
    integrated: false
  }, function(profile, done) {
    done(null, profile);
  }));

};
