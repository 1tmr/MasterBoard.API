const router = require('express').Router(),
      mongoose = require('mongoose'),
      Users = mongoose.model('Users'),
      auth = require('../../auth');

// POST /api/users/
router.post('/', auth.optional, (req, res, next) =>{
  const { body: {user} } = req;

  if(!user.email){
    return res.status(422).json({
      errors: {
        errId: 100002,
        errMsg: 'email is required'
      }
    });
  };

  if(!user.password){
    return res.status(422).json({
      errors: {
        errId: 100003,
        errMsg: 'password is required'
      }
    });
  };

  var dbUser = new Users(user);

  if(dbUser){
      dbUser.setPassword(user.password);
      dbUser.setName();
      return dbUser.save().then(()=> res.json({user: dbUser.toAuthJSON()}));
  } else {
    return res.status(500).json({errors: {errId: 100000, errMsg: 'user cannot be created'}});
  };
});

router.use('/login', require('./login'));
router.use('/data', require('./details'));

module.exports = router;
