const router = require('express').Router(),
      mongoose = require('mongoose'),
      Users = mongoose.model('Users');

router.post('/', (req, res, next) =>{
  const { body: {user} } = req;

  if(!user.email){
    return res.status(422).json({
      errors: {
        errId: 100002,
        email: 'is required'
      }
    });
  };

  if(!user.password){
    return res.status(422).json({
      errors: {
        errId: 100003,
        password: 'is required'
      }
    });
  };

  var dbUser = new Users(user);

  dbUser.setPassword(user.password);
  return dbUser.save().then(()=> res.json({user: dbUser.toAuthJSON()}));
});

module.exports = router;
