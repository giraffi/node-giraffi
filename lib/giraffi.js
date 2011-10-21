/*
 * giraffi.js 
 *    The wrapper for node-giraffi object
 *
 */
var giraffi = exports;

require('pkginfo')(module, 'version');
giraffi.createClient = require('./giraffi/app').createClient;


giraffi.errorHandler = function(client) {
  var client = client;
  return function(err, req, res, next) {
    client.level('fatal').logger(err.stack);
    next();
  };
};

giraffi.expressLogger = function(client, options) {
  var client = client,
      express = require('express');

  if(typeof options === "undefined") options = {};

  client.write = function(data) {
    client.level("info").logger(data);
  };

  options.stream = client;

  return express.logger(options);
};
