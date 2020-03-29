const Label = require('../../model/label'),
      Lang = require('../../model/lang'),
      cerberus = require('../../config/cerberus');

module.exports.get_labels = async (req, res, next)=>{
  var {params : {viewtag}} = req;
  var {userParams} = req;
  var lang;
  if(userParams && userParams.lang){
    lang = userParams.lang;
  } else {
    lang = await Lang.findOne({lang: 'ru'});
    lang = lang._id;
  };

  if(!viewtag) return res.json({errors: {errId: 300001, errMsg: "view tag is required"}});
  console.log(viewtag);
  console.log(lang);
  return Label
    .find({ui: viewtag, lang: lang})
    .then((labels) => {
      return res.json({labels: labels});
    });
};

module.exports.post_labels = async (req, res, next)=>{
  if(cerberus.allowed(req)){
      var { body } = req;
      for(let entry of Object.entries(body)){
        var lang = entry[0];
        var ui = entry[1];
        var dbLang = await Lang.findOne({lang: lang});
        var LANG_ID = dbLang._id;
        for(let uiEntry of Object.entries(ui)){
          var UI_NAME = uiEntry[0];
          for(let item of uiEntry[1]){
            var dbLabel = new Label({ui: UI_NAME, name: item.name, value: item.value, lang: LANG_ID});
            if(dbLabel) (dbLabel.save());
          };
        };
      };
      return res.json({success: {errId: 0}});
  } else {
    return res.json({errors: {errId: 1, errMsg: "no access here"}});
  }
};
