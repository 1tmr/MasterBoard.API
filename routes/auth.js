const jwt = require('express-jwt'),
      env = (process.env.NODE_ENV || 'development'),
      secret = require('../config/secret')[env];

const getHeaderToken = (req) =>{
  const {headers: {authorization}} = req;

  if(authorization && authorization.split(' ')[0] === 'Token'){
    return authorization.split(' ')[1];
  }
  return null;
}

const auth = {
  required: jwt({
    secret: secret.websecret,
    userProperty: 'userParams',
    getToken: getHeaderToken
  }),
  optional: jwt({
    secret: secret.websecret,
    userProperty: 'userParams',
    getToken: getHeaderToken,
    credentialsRequired: false
  })
};

module.exports = auth;
