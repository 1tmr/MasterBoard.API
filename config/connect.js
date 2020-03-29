const mongoose = require('mongoose'),
      env = (process.env.NODE_ENV || 'development'),
      secret = require('./secret')[env];

var mongoDB = secret.db.provider+'://'+secret.db.user + ':' + secret.db.password
            + '@' + secret.db.server + ':' + secret.db.port + '/' + secret.db.database
            + '?authSource=' + secret.db.database;

mongoose.connect(mongoDB, {useNewUrlParser: true});
if(env === 'development')
  mongoose.set('debug', true);
else
  mongoose.set('debug', false);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error: '));
