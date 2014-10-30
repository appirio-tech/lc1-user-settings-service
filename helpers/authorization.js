/**
 * Copyright (C) 2014 TopCoder Inc., All Rights Reserved.
 */
"use strict";

/**
 * Represents authorization middleware
 * @author TCSASSEMBLER
 */

var config = require("../config"),
    validator = require("./validator"),
    NotAuthorizedError = require("../errors/NotAuthorizedError"),
    request = require('request'),
    jwt = require('express-jwt');;

/**
 * Authorize the request by submitting req.headers.authorization to Topcoder API. 
 * If successful, this function sets req.user.id to the user id from the response.
 * @param {Object} req the request
 * @param {Object} res the response
 * @param {Function} next the callback function
 */
function _authorizeByTopcoderApi(req, res, next) {
  var options = {
    url: config.AUTHORIZATION.API.URL,
    headers: {
      'Authorization': req.headers.authorization,
      'Content-Type': 'application/json'
    }
  };
  request(options, function(err, response, body) {
    if (err) {
      return next(err);
    }
    if (response.statusCode != 200) {
      return next(new NotAuthorizedError());
    }
    req.user = {
      id: JSON.parse(body).uid
    };
    next();
  });
};

/**
 * Authorize the request by decrypting the req.headers.authorization using express-jwt.
 * If successful, this function sets req.user.id to the user.id from the decrypted data.
 * @param {Object} req the request
 * @param {Object} res the response
 * @param {Function} next the callback function
 */
function _authorizeLocally(req, res, next) {
  // Set the key with the value of REAL_KEY in the config file.
  // This key will be used to decrypt req.headers.authorization.
  var key = config.AUTHORIZATION.LOCAL.REAL_KEY;
  
  // But, if in the config file, USE_DUMMY_KEY is true, the key will be changed to use DUMMY_KEY instead.
  if (config.AUTHORIZATION.LOCAL.USE_DUMMY_KEY == true) {
    key = config.AUTHORIZATION.LOCAL.DUMMY_KEY;
  }
  
  jwt({ secret: key })(req, res, next);
};

/**
 * Authorize the user based on the JWT token found in request authorization header.
 * Authorization method is determined in the config file.
 * The "API" method is to pass the authorization header to topcoder api 
 *   and set the user id based on the response.
 * The "LOCAL" method is to decrypt the authorization header with express-jwt
 *   and set the user id based on the decrypted data.
 * @param {Object} req the request
 * @param {Object} res the response
 * @param {Function} next the callback function
 */
function authorize(req, res, next) {
  var method = config.AUTHORIZATION.USED_METHOD;
  if (method === "API") {
    _authorizeByTopcoderApi(req, res, next);
  } else if (method === "LOCAL") {
    _authorizeLocally(req, res, next);
  } else {
    return next(new NotAuthorizedError());
  }
}

/**
 * Export authorize function
 */
module.exports = {
  authorize: authorize
};
