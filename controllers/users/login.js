const passport = require('passport'),
      User = require('../../model/users');

module.exports.post_login = (req, res, next) =>{
  const {body: {user} } = req;

  if(!user.email){
    return res.status(422).json({
      errors: {
        errId: 101001,
        errMsg: 'email is required'
      }
    });
  };

  if(!user.password){
    return res.status(422).json({
      errors: {
        errId: 101002,
        errMsg: 'password is required'
      }
    });
  };

  return passport
    .authenticate('local', {session: false}, (err, passportUser, info) =>{
    if(err) return next(err);

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();
      return res.json({user: user.toAuthJSON()});
    };

    return res.status(400).json({errors: {errId: 101003, errMsg: 'Unknown user'}});
  })(req, res, next);
};
