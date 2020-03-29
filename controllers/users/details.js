const Users = require('../../model/users'),
      cerberus = require("../../config/cerberus");

module.exports.get_data = (req, res, next) =>{
  if(cerberus.allowed(req)){
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
   } else {
     return res.json({errors: {errId: 1, errMsg: "no access here"}});
   };
}

module.exports.get_dataByUID = (req, res, next) =>{
  if(cerberus.allowed(req)){
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
  } else {
    return res.json({errors: {errId: 1, errMsg: "no access here"}});
  };
};
