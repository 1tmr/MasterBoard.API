const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

var NewsSchema = new Schema({
  title: String,
  content: String,
  author: [{type: Schema.Types.ObjectId, ref: 'Users'}],
  created: {type: Date, default: Date.now}
});

module.exports = model('News', NewsSchema);
