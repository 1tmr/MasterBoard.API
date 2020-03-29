const mongoose = require('mongoose'),
      passport = require('passport'),
      LocalStrategy = require('passport-local');

const Users = mongoose.model('Users');

passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[passwd]'
},(email, password, done) =>{
  Users.findOne({email})
    .then((user) => {
      if(!user || !user.validatePassword(password)){
        return done(null, false, {errors: {errId: 1, 'email or password': 'is invalid'}});
      };
      return done(null, user);
    }).catch(done);
}));
