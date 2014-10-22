/*
 * Copyright (C) 2014 TopCoder Inc., All Rights Reserved.
 */
/**
 * Represents configuration file.
 *
 * @version 1.0
 * @author TCSASSEMBLER
 */
"use strict";

module.exports = {

    //The MongoDB URL.
    MONGODB_URL : "mongodb://127.0.0.1:27017/tc-settings",

    //The MongoDB connection pool size.
    MONGODB_CONNECTION_POOL_SIZE : 50,

    //The port number for API.
    API_PORT: process.env.PORT || 4545,

    //The default limit for Get all calls
    DEFAULT_LIMIT: 50,

    //The user id set in stub authentication middleware.
    MOCK_USER_ID: 123456
};