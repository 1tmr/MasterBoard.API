const Lang = require('../../model/lang'),
      cerberus = require('../../config/cerberus');

module.exports.get_langs = (req, res, next)=>{
  return Lang.find().then((langs) => {return res.json({langs: langs})})
};

module.exports.post_lang = (req, res, next)=>{
  if(cerberus.allowed(req)){
      var { body: {lang} } = req;

      var dbLang = new Lang(lang);
      if(dbLang){
        dbLang.save();
        return res.json(dbLang);
      }
  } else {
    return res.json({errors: {errId: 1, errMsg: "no access here"}});
  }
};
