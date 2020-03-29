const News = require('../../model/news')
      Users = require('../../model/users');

function newsByCount(req, res, next) {
  var {params: {count}} = req;
  var news = News
    .find()
    .sort("-created")
    .limit(parseInt(count))
    .populate("author")
    .then((news)=>{
      var data = [];
      news.forEach( (item) => {
        data.push({
          title: item.title,
          content: item.content,
          author: item.author[0].name,
          date: item.created
        });
      });
      return res.json({news: data});
    });
};

function news(req, res, next){
  req.params = {count: 10};
  return newsByCount(req, res, next);
};

module.exports.news = news;
module.exports.newsByCount = newsByCount;
