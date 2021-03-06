/*
 * app.js
 *    Main module for accessing the Applog server
 *
 */
var events  = require('events')
  , qstring = require('querystring')
  , config  = require('./config')
  , utils  = require('./utils');

/*
 * Giraffi (config)
 *    constructor for the Giraffi object.
 */
var Giraffi = exports.Giraffi = function (config) {
  this.config = config;
};

/*
 * function createClient (options)
 *    Creates a new instance of a Giraffi client.
 */
exports.createClient = function (options) {
  return new Giraffi(config.createConfig(options));
};

/*
 *  function level (level)
 *    set a log level to retrieve
 */
Giraffi.prototype.level = function (level) {
  if (typeof level !== 'string') {
    throw new Error('Level must be a string: info, debug, error, fatal, etc.');
  }

  this._level = level;
  return this;
};

/*
 *  function limit (limit)
 *    set a limit of logs to retrieve 
 */
Giraffi.prototype.limit = function (limit) {
  if (typeof limit !== 'number') {
    throw new Error('Limit must be a number: max 100');
  }

  this._limit = limit;
  return this;
};

/*
 * function logger (msg, callback)
 *    post logs to Applog APIs
 */
Giraffi.prototype.logger = function (msg, callback) {
  var emitter = new events.EventEmitter()
    , requestObj
    , requestBody;

  if (msg instanceof Object) {
    throw new Error('Unable to post a object as log message');
  }
  else {
    requestObj = {
      applog : {
        message : msg,
        time : (Date.now()/1000),
        type : this.config.type,
        level : this._level || null
      }
    };
    requestBody = JSON.stringify(requestObj);
  }

  var loggerOptions = {
    uri: this.config.giraffiUrl + '?apikey=' + this.config.apikey,
    method: 'POST',
    body: requestBody,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  utils.giraffi(loggerOptions, callback, function (res, body) {
    try {
      var result = JSON.parse(body);

      if (callback) {
        callback(null, result);
      }
      emitter.emit('logger', result);
    }
    catch (ex) {
      if (callback) {
        callback(new Error('Unspecified error from Applog APIs: ' + ex));
      }
    }
  });

  return emitter;
};

/*
 *  function retrieve (msg, callback)
 *    retrieve a object from Applog APIs
 */
var Retrieve = exports.Retrieve = function (msg, client, callback) {
  this.message = msg;
  this.config = client.config;
  this._level = client._level;
  this._limit = client._limit;

  if (callback) {
    this.callback = callback;
    this.perform();
  }
};

Giraffi.prototype.retrieve = function (msg, callback) {
  return new Retrieve(msg, this, callback);
};

Retrieve.prototype.perform = function (callback) {
  var requestObj
    , queryString;

  this.callback = callback || this.callback;
  if (!this.callback) {
    throw new Error('Unable to retrieve logs without a callback function.');
  }

  if (this.message instanceof Object) {
    throw new Error('Unable to retrieve logs with a object');
  }
  else {
    this.message.trim();

    requestObj = {
      message : this.message || null,
      level : this._level || null,
      limit : this._limit || 10
    };

    queryString = qstring.stringify(requestObj);
  }

  var self = this
    , url  = this.config.giraffiUrl + '?apikey=' + this.config.apikey + '&' + queryString;


  utils.giraffi(url, this.callback, function (res, body) {
    self.callback(null, JSON.parse(body));
  });

  return this;
};

