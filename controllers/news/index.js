const gets = require('./get'),
      posts = require('./post');

module.exports.get_news = gets.news;
module.exports.get_newsByCount = gets.newsByCount;
module.exports.post_news = posts.news;
