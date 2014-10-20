/**
 * Copyright (C) 2014 TopCoder Inc., All Rights Reserved.
 */
"use strict";

/**
 * Represents validation methods
 * @version 1.0
 * @author TCSASSEMBLER
 */

var _ = require('underscore'),
    util = require('util');

/**
 * Represents the map with error codes.
 */
var ERRORS = {
    MISSING_FIELD: {
        errorCode: 1,
        message: "A required property was not provided: %s"
    },
    //string errors
    EXPECTED_STRING: {
        errorCode: 2,
        message: "The %s property must be a string"
    },
    EMPTY_OR_SPACES_STRING: {
        errorCode: 3,
        message: "The %s property cannot be empty or contain only spaces"
    },
    MAX_LENGTH: {
        errorCode: 4,
        message: "The %s property must contain less than %s characters"
    },
    INVALID_ENUM: {
        errorCode: 5,
        message: "The %s property must be an enum value: %s"
    },
    INVALID_OBJECT_ID: {
        errorCode: 6,
        message: "The %s property must be an ObjectId (24 hex characters)"
    },
    INVALID_OFFSET: {
        code: 7,
        message: "The offset property must be an integer greater or equal to 0"
    },
    INVALID_LIMIT: {
        code: 8,
        message: "The limit property must be an integer greater than 0"
    }
};


/**
 * Check if input parameter is valid number.
 * @param {Number | String} number the number to check
 * @private
 * @return {Boolean} true if valid, false if invalid
 */
function _isValidNumber(number) {
    return !_.isNaN(number) && isFinite(number);
}

/**
 * Check if input parameter is valid integer.
 * @param {Number} number the number to check
 * @private
 * @return {Boolean} true if valid, false if invalid
 */
function _isValidInteger(number) {
    return _isValidNumber(number) && number % 1 === 0;
}

/**
 * Validate object if matches given definition (validation schema).
 * The definition object has following format:
 * {
 *   propertyA: {type: "expectedType", fieldA: "valueA"},
 *   propertyB: {type: "expectedType", fieldB: "valueB"},
 * }
 * propertyA defines validation rule for obj.propertyA
 * propertyB defines validation rule for obj.propertyB
 * fieldA defines extra setting for validation (e.g. max string length)
 * etc.
 * allowed types:
 * - string (set length=XX to set max length of the string)
 * - objectId (mongo db id)
 * - enum (set 'values' to specify allowed enum values, example {type: "enum", values: ["valA", "valB", "valC"]}
 * - limit
 * - offset
 *
 * By default all fields are required.
 * Specify optional=true to make field optional.
 *
 * @param {Object} definition the object expected definition
 * @param {Object} obj the object to validate, extra properties will be removed
 * @returns {Error} the error if there was a validation issue
 * @throws {Error} error if unsupported type was used
 */
function validateObject(definition, obj) {
    var allowedFields = _.keys(definition),
        missingFields = _.difference(allowedFields, _.keys(obj)),
        prop,
        error;
    //remove extra properties
    for (prop in obj) {
        if (obj.hasOwnProperty(prop) && !definition.hasOwnProperty(prop)) {
            delete obj[prop];
        }
    }

    /**
     * Create Error object and set local error variable
     * @param {Object} errorObj the error, any property of the ERRORS object
     * @param {Array<String>} [args] the array of strings used to format a message of the error
     * @returns {Boolean} true (it will break array.some array)
     */
    function setError(errorObj, args) {
        var msg = util.format.apply(util, [errorObj.message].concat(args || []));
        error = new Error(msg);
        error.errorCode = errorObj.errorCode;
        error.status = 400;
        return true;
    }

    missingFields.some(function (fieldName) {
        if (!definition[fieldName].optional) {
            return setError(ERRORS.MISSING_FIELD, [fieldName]);
        }
        return false;
    });

    if (error) {
        return error;
    }
    _.keys(obj).some(function (fieldName) {
        var def = definition[fieldName],
            value = obj[fieldName];
        switch (def.type) {
        case "string":
            if (!_.isString(value)) {
                return setError(ERRORS.EXPECTED_STRING, [fieldName]);
            }
            if (def.length && value.length >= def.length) {
                return setError(ERRORS.MAX_LENGTH, [fieldName, def.length]);
            }
            if (value.trim().length === 0 && def.empty === false) {
                return setError(ERRORS.EMPTY_OR_SPACES_STRING, [fieldName]);
            }
            break;
        case "enum":
            if (def.values.indexOf(value) === -1) {
                return setError(ERRORS.INVALID_ENUM, [fieldName, def.values.join(", ")]);
            }
            break;
        case "objectId":
            if (!/^[a-zA-Z0-9]{24}$/.test(String(value))) {
                return setError(ERRORS.INVALID_OBJECT_ID, [fieldName]);
            }
            break;
        case "offset":
            value = Number(value);
            if (!_isValidInteger(value) || value < 0) {
                return setError(ERRORS.INVALID_OFFSET);
            }
            break;
        case "limit":
            value = Number(value);
            if (!_isValidInteger(value) || value < 1) {
                return setError(ERRORS.INVALID_LIMIT);
            }
            break;
        default:
            throw new Error("Unsupported type: " + def.type);
        }
        return false;
    });
    return error;
}

module.exports = {
    validateObject: validateObject
};