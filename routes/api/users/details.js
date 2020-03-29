const router = require('express').Router(),
      mongoose = require('mongoose'),
      passport = require('passport'),
      Users = mongoose.model('Users'),
      auth = require('../../auth');

//GET /api/users/data
router.get('/', auth.required, (req, res, next) =>{
  const {params: {id}} = req;
  var user = Users.find({id});

  return res;
});

module.exports = router;
