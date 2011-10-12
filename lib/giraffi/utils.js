/*
 * utils.js
 *    Utilites for working with Applog Server APIs
 */

var util = require('util')
  , request = require('request')

var utils = exports;

var ErrCodes = utils.ErrCodes = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  422: 'Unprocessable Entity',
  500: 'Internal Server Error',
  503: 'Service Unavailable',
  504: 'Gateway Time-out'
};

utils.giraffi = function () {
  var args = Array.prototype.slice.call(arguments)
    , success = args.pop()
    , callback = args.pop()
    , requestBody
    , headers
    , method
    , uri;

  if (typeof args[0] === 'string') {
    uri    = args[0];
    method = 'GET';
  }
  else {
    uri         = args[0]['uri'];
    method      = args[0]['method'] || 'GET';
    requestBody = args[0]['body'];
    headers     = args[0]['headers'];
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
      if (Object.keys(ErrCodes).indexOf(statusCode) !== -1) {
        return onError((new Error('Error [' + statusCode + '] ' + ErrCodes[statusCode])));
      }

      success(res, body);
    });
  }
  catch (ex) {
    onError(ex);
  }
};
