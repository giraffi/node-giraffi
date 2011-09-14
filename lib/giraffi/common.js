/*
 *  common.js: Common utility functions for requesting against Giraffi APIs
 *
 */

var util = require('util')
  , request = require('request')
  , giraffi = require('../giraffi');

var common = exports;

var NgCodes = common.NgCodes = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  422: 'Unprocessable Entity',
  500: 'Internal Server Error',
  503: 'Service Unavailable',
  504: 'Gateway Time-out'
};

var OkCodes = common.OkCodes = {
  200: 'OK',
  201: 'Created',
  204: 'No Content'
};

common.giraffi = function () {
  var args = Array.prototype.slice.call(arguments)
    , success = args.pop()
    , callback = args.pop()
    , requestBody
    , headers
    , method
    , uri;

  if (args.length == 1) {
    if (typeof args[0] === 'string') {
      method = 'GET';
      uri    = args[0];
    }
    else {
      uri         = args[0]['uri'];
      method      = args[0]['method'] || 'GET';
      requestBody = args[0]['body'];
      headers     = args[0]['headers'];
    }
  }
  else {
    method  = args[0];
    uri  = args[1];
  }

  function onError (err) {
    if (callback) {
      callback(err);
    }
  }

  var requestOptions = {
    uri: uri,
    method: method,
    headers: headers || {}
  };

  if (requestBody) {
    requestOptions.body = requestBody;
  }

  try {
    request(requestOptions, function (err, res, body) {
      if (err) {
        return onError(err);
      }

      var statusCode = res.statusCode.toString();
      if (Object.keys(NgCodes).indexOf(statusCode) !== -1) {
        return onError((new Error('Giraffi Error [' + statusCode + '] ' + NgCodes[statusCode])));
      }

      success(res, body);
    });
  }
  catch (ex) {
    onError(ex);
  }
};

