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
    request = require('request');

/**
 * Authorize the request by submitting authorization header to Topcoder API. 
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
 * Authorize the user based on the JWT token found in request authorization header.
 * Authorization method is determined in the config file.
 * The first method is to pass the authorization header to topcoder api 
 *   and set the user id based on the response.
 * The second method is to decrypt the authorization header with express-jwt
 *   and set the user id based on the decrypted data.
 * TODO:  Add second method
 *        Add method determination condig
 * @param {Object} req the request
 * @param {Object} res the response
 * @param {Function} next the callback function
 */
function authorize(req, res, next) {
  _authorizeByTopcoderApi(req, res, next);
}

/**
 * Export authorize function
 */
module.exports = {
  authorize: authorize
};
