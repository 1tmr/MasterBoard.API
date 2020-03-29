const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

var LabelsSchema = new Schema({
  ui: {type: String, required: true},
  name: {type: String, rquired: true},
  value: {type: String, required: true},
  lang: [{type: Schema.Types.ObjectId, ref: 'Lang', required: true}],
});

LabelsSchema.index({"ui": 1, "name": 1, "lang": 1}, {unique: true});

module.exports = model('Labels', LabelsSchema);
