const News = require('../../model/news');

function news(req, res, next){
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
};

exports.news = news;
