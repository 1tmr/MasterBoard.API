const Users = require('../../model/users');

module.exports.get_data = (req, res, next) =>{
 const {userParams: {id}} = req;

 var user = Users.findById(id)
   .then((user) => {
     if(!user){
       return res.status(400).json({errors: {errId: 10201, errMsg: "user not found"}});
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

  var user = Users.find({uid: uid})
    .then((user) => {
      if(!user){
        return res.status(400).json({errors: {errId: 10201, errMsg: "user not found"}});
      }
      return res.json({
        user: {
          email: user[0].email,
          name: user[0].name,
          uid: user[0].uid
        }});
    });
}
