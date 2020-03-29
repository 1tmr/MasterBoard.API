const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

var LangSchema = new Schema({
  lang: {type: String, unique: true, required: true},
  description: String,
});

module.exports = model('Lang', LangSchema);
