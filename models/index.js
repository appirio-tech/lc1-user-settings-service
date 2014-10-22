/*
 * Copyright (C) 2014 TopCoder Inc., All Rights Reserved.
 */
/**
 * Init and export all schemas.
 *
 * @version 1.0
 * @author TCSASSEMBLER
 */
"use strict";


var mongoose = require('mongoose'),
    config = require("../config");

var db = mongoose.createConnection(config.MONGODB_URL, { server : { poolSize : config.MONGODB_CONNECTION_POOL_SIZE } });

module.exports = {
    Setting: db.model('Setting', require('./Setting').SettingSchema),
    User: db.model('User', require('./User').UserSchema),
    SavedSearchType: require('./Setting').SavedSearchType
};