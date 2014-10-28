/*
 * Copyright (c) 2014 TopCoder, Inc. All rights reserved.
 */
"use strict";

/**
 * This file defines NotAuthorizedError
 * @author TCSASSEMBLER
 */

/**
 * Constructor of NotAuthorizedError
 * @param {Object} message the error message
 * @param {Object} cause the error cause
 */
var NotAuthorizedError = function (message, cause) {
  //captureStackTrace
  Error.call(this);
  Error.captureStackTrace(this);
  this.message = message || "NotAuthorizedError";
  this.status = 401;
  this.errorCode = 401;
  this.cause = cause || "Authorization is not granted";
};

//use Error as prototype
require('util').inherits(NotAuthorizedError, Error);
NotAuthorizedError.prototype.name = 'NotAuthorizedError';

module.exports = NotAuthorizedError;
