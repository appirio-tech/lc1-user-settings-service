/*
 * Copyright (C) 2014 TopCoder Inc., All Rights Reserved.
 */
/**
 * Represents User schema.
 *
 * @version 1.0
 * @author TCSASSEMBLER
 */
"use strict";
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//embedded schema
var UserSchema = new Schema({
    _id: {type: Number, required: true, index: true, unique: true}
});

module.exports = {
    UserSchema: UserSchema
};