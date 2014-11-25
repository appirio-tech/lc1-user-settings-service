/*
 * Copyright (C) 2014 TopCoder Inc., All Rights Reserved.
 */
/**
 * Represents Settings and Saved Search schema.
 *
 * @version 1.0
 * @author TCSASSEMBLER
 */
"use strict";
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    _ = require('underscore');

//Enum with allowed types for SavedSearch
var SavedSearchType = {develop: 'develop', design: 'design', data: 'data'};

//embedded schema
var SavedSearchSchema = new Schema({
    type: {type: String, required: true, "enum": _.values(SavedSearchType) },
    name: {type: String, required: false},
    filter: {type: String, required: false}
});

var SettingSchema = new Schema({
    user: {type: Number, required: true, ref: "User", index: true},
    savedSearches: {type: [SavedSearchSchema], "default": []}
});

// rename _id to id when calling toObject({transform: true}))
SavedSearchSchema.options.toObject = {
    transform: function (doc, ret) {
        ret.id = doc._id;
        delete ret._id;
    }
};

module.exports = {
    SettingSchema: SettingSchema,
    SavedSearchType: SavedSearchType
};