const Users = require('../../model/users');

module.exports.get_data = (req, res, next) =>{
 const {userParams: {id}} = req;

 var user = Users.findById(id)
   .then((user) => {
     if(!user){
       return res.status(400).json({errors: {errId: 102001, errMsg: "user not found"}});
     }
     return res.json({
       user: {
         email: user.email,
         name: user.name,
         uid: user.uid
       }});
   });
}

module.exports.get_dataByUID = (req, res, next) =>{
  const {params: {uid}} = req;

  var user = Users.findOne({uid: uid})
    .then((user) => {
      if(!user){
        return res.status(400).json({errors: {errId: 102001, errMsg: "user not found"}});
      }
      return res.json({
        user: {
          email: user.email,
          name: user.name,
          uid: user.uid
        }});
    });
}
