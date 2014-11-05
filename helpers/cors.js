/*jslint indent: 2*/
/*global require: true, module: true*/

(function () {

  'use strict';

  module.exports = function (options) {
    options = options || { allow: /^https?:\/\/(.+\.)?topcoder\.com$/ };

    return function (req, res, next) {
      if (req.headers.origin && req.headers.origin.match(options.allow)) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Headers', 'Authorization,Content-Type,Accept,Origin,User-Agent,DNT,Cache-Control,X-Mx-ReqToken,Keep-Alive,X-Requested-With,If-Modified-Since');
        res.header('Access-Control-Allow-Credentials', 'true');
      }
      next();
    };
  };

}());