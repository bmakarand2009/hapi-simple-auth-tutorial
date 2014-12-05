"use strict";

var Joi = require('joi');


/*
This module verifies the calls against a fixed username and passowrd
anytime u need ot change the credentials change here and redeploy it
Other ideals to centralize it  is to have a webservice
reference can be obtained from
https://github.com/agendor/sample-hapi-rest-api/blob/master/src/models/user.js

*/
module.exports = function(userName, password, callback) {

  // var userModel = new UserModel();
 var appUserName = "testuser"//constants.application['appUserName'];
 var appPassword = "testpassword"//constants.application['appPassword'];
  var credentials = {};
  if(userName === appUserName && appPassword === password){
    credentials.userName = userName;
  }
  var schema = {
    userName: Joi.string().required(),
  };
  var isValid = validate(credentials);
  callback(null, isValid, credentials);
};

function validate(credentials) {
  credentials = credentials || {};
  var schema = {
    userName: Joi.string().required(),
  };

  var err = Joi.validate(credentials, schema, {allowUnknown:true});
  return err === null;
}



