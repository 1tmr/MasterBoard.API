const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

var NewsSchema = new Schema({
  title: String,
  content: String,
  created: {type: Date, default: Date.now()}
});

var News = model('News', NewsSchema);

var topNews = new News({title: "top News 1", content: "bla bla bla bla bla"});

topNews.save();
