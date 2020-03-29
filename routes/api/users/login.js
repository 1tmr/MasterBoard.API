const router = require('express').Router(),
      mongoose = require('mongoose'),
      passport = require('passport'),
      Users = mongoose.model('Users'),
      auth = require('../../auth');

// POST /api/users/login
router.post('/', auth.optional, (req, res, next) =>{
  const {body: {user} } = req;

  if(!user.email){
    return res.status(422).json({
      errors: {
        errId: 10101,
        errMsg: 'email is required'
      }
    });
  };

  if(!user.password){
    return res.status(422).json({
      errors: {
        errId: 10102,
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

    return res.status(400).json({errors: {errId: 10103, errMsg: 'Unknown user'}});
  })(req, res, next);
});

module.exports = router;
