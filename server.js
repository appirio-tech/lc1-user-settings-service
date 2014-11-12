/*
 * Copyright (C) 2014 TopCoder Inc., All Rights Reserved.
 */
/**
 * Represents main application file.
 *
 * @version 1.0
 * @author TCSASSEMBLER
 */
"use strict";

/*jslint unparam: true */

exports.init = function () {
    var express = require('express'),
        winston = require('winston'),
        morgan = require('morgan'),
        bodyParser = require('body-parser'),
        helmet = require('helmet'),
        cors = require('./helpers/cors'),
        config = require("./config.js"),
        auth = require("./helpers/authorization.js"),
        app = express();

    app.use(morgan('dev'));
    app.use(bodyParser.json());

    // use helmet middleware to secure incoming requests
    app.use(helmet());

    app.use(cors({ allow: config.ALLOWED_ORIGINS }));

    // use authorize function of ./helpers/authorization middleware to authorize users
    app.use(auth.authorize);

    app.use('/saved-searches', require("./controllers/SavedSearches.js"));

    // error handler
    app.use(function (err, req, res, next) {
        winston.error(err.stack || JSON.stringify(err));
        res.statusCode = err.status || 500;
        res.json({
            status: res.statusCode,
            developerMessage: err.message,
            errorCode: err.errorCode || res.statusCode
        });
    });

    // Start the server
    app.listen(config.API_PORT);
    winston.info('Express server listening on port ' + config.API_PORT);
};