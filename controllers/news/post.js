const News = require('../../model/news'),
      cerberus = require('../../config/cerberus');

function news(req, res, next){
  if(cerberus.allowed(req)){
    var { body: {news} } = req;
    const {userParams: {id}} = req;

    if(!news.title) {
      return res.status(422).json({errors: {errId: 200001, errMsg: "title required"}});
    }
    if(!news.content) {
      return res.status(422).json({errors: {errId: 200002, errMsg: "content required"}});
    }

    news.author = id;

    var dbNews = new News(news);

    if(dbNews){
      return dbNews.save().then(() => res.json({news: dbNews}));
    } else {
      return res.status(500).json({errors: {errId: 200003, errMsg: 'news cannot be created'}});
    };
  } else {
    return res.json({errors: {errId: 1, errMsg: "no access here"}});
  };
};

exports.news = news;
