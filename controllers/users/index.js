const Users = require('../../model/users'),
      details = require('./details'),
      login = require('./login');

module.exports.get_index = (req, res, next) =>{
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
};

module.exports.get_data = details.get_data;
module.exports.get_dataByUID = details.get_dataByUID;
module.exports.post_login = login.post_login;
