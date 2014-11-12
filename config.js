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

    //DEBUG: true,

    //The MongoDB URL.
    MONGODB_URL : process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/tc-settings",

    //The MongoDB connection pool size.
    MONGODB_CONNECTION_POOL_SIZE : 50,

    //The port number for API.
    API_PORT: process.env.PORT || 4545,

    //The default limit for Get all calls
    DEFAULT_LIMIT: 50,

    ALLOWED_ORIGINS: /^https?:\/\/(.+\.)?topcoder\.com$/,
  
    //Authorization config
    AUTHORIZATION: {
      
      //The method used for authorization. Currently, it can be set as one of the following:
      //  API     Using Topcoder API to authorize JWT Token and get user id
      //  LOCAL   Decrypt JWT Token locally with express-jwt and get user id
      //Any others will generate NotAuthorizedError
      USED_METHOD: "API",
      
      //API method config
      API: {
        //URL of the Topcoder API endpoint used to authorize JWT Token
        URL: "http://api.topcoder.com/v2/user/identity"
      },
      
      //LOCAL method config
      LOCAL: {
        //If USE_DUMMY_KEY is true, DUMMY_KEY will be used to decrypt JWT Token in the request authorization header.
        //If USE_DUMMY_KEY is false, REAL_KEY will be used to decrypt JWT Token in the request authorization header.
        USE_DUMMY_KEY: true,
        //REAL_KEY is currently filled with a random key for Postman testing purpose.
        //As the name suggests, the real key to decrypt JWT Token used in production must be filled here.
        REAL_KEY: "wadwapodlkmklmwadoijagapowadjkw",
        //DUMMY_KEY doesn't really need to be changed.
        //If USE_DUMMY_KEY is true, this dummy key will be used instead of the real key.
        DUMMY_KEY: "mofkmldfcxdkmfgjnfececfjmglsofg"
      }
    }
  
};