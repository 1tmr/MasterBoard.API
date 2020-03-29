const mongoose = require('mongoose'),
      AutoIncrement = require('mongoose-sequence')(mongoose),
      crypto = require('crypto'),
      jwt = require('jsonwebtoken'),
      env = (process.env.NODE_ENV || 'development'),
      secret = require('../config/secret')[env],
      {Schema} = mongoose;

const UsersSchema = new Schema({
  email: {type: String, required: true, unique: true},
  name: String,
  hash: String,
  salt: String
});

UsersSchema.plugin(AutoIncrement, {inc_field: 'uid'});

UsersSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UsersSchema.methods.setName = function(name){
  this.name = name || this.email.split('@')[0];
};

UsersSchema.methods.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UsersSchema.methods.generateJWT = function(){
  const today = new Date();
  const expDate = new Date(today);
  expDate.setDate(today.getDate() + 60);

  return jwt.sign({
    email: this.email,
    id: this.id,
    exp: parseInt(expDate.getTime() / 1000, 10),
  }, secret.websecret);
};

UsersSchema.methods.toAuthJSON = function(){
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT()
  };
};

UsersSchema.methods.toJSON = function(){
  return {
    uid: this.uid,
    email: this.email,
    name: this.name
  };
};

module.exports = mongoose.model('Users', UsersSchema);
