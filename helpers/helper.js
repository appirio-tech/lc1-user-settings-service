/**
 * Copyright (C) 2014 TopCoder Inc., All Rights Reserved.
 */
"use strict";

/**
 * Represents generic helper methods
 * @version 1.0
 * @author TCSASSEMBLER
 */

/*jslint unparam: true */

var config = require("../config"),
    validator = require("./validator");

//exported helper
var helper = {};


/**
 * Get or create an entity
 * @param {Object} Model the mongoose model
 * @param {Object} params the params to search or create
 * @param {Function<err, entity>} callback the callback function
 */
helper.getOrCreate = function (Model, params, callback) {
    Model.findOne(params, function (err, doc) {
        if (err || doc) {
            return callback(err, doc);
        }
        Model.create(params, function (err, entity) {
            callback(err, entity);
        });
    });
};

/**
 * The middleware for validating the offset and limit parameters.
 * req.offset and req.limit will be set.
 * Default values will be set if req.query.offset or req.query.limit are not defined
 * @param {Object} req the request
 * @param {Object} res the response
 * @param {Function} next the callback function
 */
helper.offsetAndLimitMiddleware = function (req, res, next) {
    var offset = 0, limit = config.DEFAULT_LIMIT, error;
    if (req.query.hasOwnProperty("offset")) {
        offset = Number(req.query.offset);
    }
    if (req.query.hasOwnProperty("limit")) {
        limit = Number(req.query.limit);
    }
    error = validator.validateObject(
        {
            offset: {type: "offset"},
            limit: {type: "limit"}
        },
        {
            offset: offset,
            limit: limit
        }
    );
    if (error) {
        return next(error);
    }
    req.offset = offset;
    req.limit = limit;
    next();
};


module.exports = helper;