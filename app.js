const express = require('express'),
      bodyParser = require('body-parser'),
      session = require('express-session'),
      logger = require('morgan'),
      env = (process.env.NODE_ENV || 'development'),
      secret = require('./config/secret')[env],
      errorHandler = require('errorhandler');

const isProd = (env === 'production');
var app = express();
app.set('port', 8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
  secret: secret.websecret,
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false
}));
if(!isProd){
  app.use(logger('dev'));
  app.use(errorHandler());
};

require('./config/connect');
require('./model/index');
require('./config/passport');

app.use('/',  require('./routes'));

if(!isProd){
  console.log('NONPROD');
  app.use((err,req,res)=>{
    res.status(err.status||500);
    res.json({err: {message: err.message, err: err}});
  });
} else {
  console.log('PROD');
  app.use((err,req,res)=>{
    res.status(err.status||500);
    res.json({err: {}});
  });
};

function startApp(){
  return app.listen(app.get('port'), function() {
    console.log('running on ' + app.get('port'));
  });
};

startApp();
