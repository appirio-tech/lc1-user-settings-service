"use strict";

/*jslint unparam: true */

var cluster = require('cluster');
var winston = require('winston');
var server = require('./server.js');
var config = require("./config.js");

var i = 0;
var curr;
var workers = require('os').cpus().length;

if (cluster.isMaster) {
    cluster.setupMaster({
        execArgv: process.execArgv.filter(function (s) {
            return s !== '--debug';
        })
    });

    if (config.DEBUG) {
        workers = 1;
        cluster.settings.execArgv.push('--debug');
    }

    winston.info('start cluster with %s workers', workers);

    for (i = 0; i < workers; i += 1) {
        curr = cluster.fork().process;
        winston.info('worker %s started.', curr.pid);
    }

    cluster.on('exit', function (worker) {
        winston.info('worker %s died. restart...', worker.process.pid);
        cluster.fork();
    });
} else {
    server.init();
}

process.on('uncaughtException', function (err) {
    winston.error((new Date()).toUTCString() + ' uncaughtException:', err.message);
    winston.error(err.stack);
    process.exit(1);
});