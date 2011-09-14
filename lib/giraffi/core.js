/*
 * core.js: Core function suite for accessing Giraffi
 *
 */
var events  = require('events')
  , config  = require('./config')
  , common  = require('./common')
  , giraffi = require('../giraffi');

/*
 * Giraffi (config)
 *    constructor for the giraffi object.
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
 *    set a level to log message
 */
Giraffi.prototype.level = function (level) {
  if (typeof level !== 'string') {
    throw new Error('Level must be a string: info, debug, error, fatal, etc.');
  }

  this._level = level;
  return this;
};

/*
 * function logger (msg, callback)
 *    send msg to Giraffi API
 */
Giraffi.prototype.logger = function (msg, callback) {
  var emitter = new (events.EventEmitter) ()
    , requestBody
    , message;

  if (msg instanceof Object) {
    throw new Error('Unable to send a object');
  }
  else {
    requestBody = {
      message : msg,
      time : (Date.now()/1000),
      type : 'app',
      level : this._level || null
    };
    message = JSON.stringify(requestBody);
  }

  var loggerOptions = {
    uri: this.config.giraffiUrl + '?apikey=' + this.config.apikey,
    method: 'POST',
    body: message,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  common.giraffi(loggerOptions, callback, function (res, body) {
    try {
      var result = JSON.parse(body);

      if (callback) {
        callback(null, result);
      }

      emitter.emit('logger', result);
    }
    catch (ex) {
      if (callback) {
        callback(new Error('Unspecified error from Giraffi: ' + ex));
      }
    }
  });

  return emitter;
};

/*
 *  function search (query, callback)
 *    get a object from Giraffi API
 */
var Search = exports.Search = function (query, client, callback) {
  this.query = query;
  this.config = client.config;
  this._level = client._level;

  if (callback) {
    this.callback = callback;
    this.run();
  }
};

Giraffi.prototype.search = function (query, callback) {
  return new Search(query, this, callback);
};


Search.prototype.run = function (callback) {
  var requestBody
    , queryJson;

  this.callback = callback || this.callback;
  if (!this.callback) {
    throw new Error('Unable to request search without a callback function.');
  }

  if (this.query instanceof Object) {
    throw new Error('Unable to query with ao object');
  }
  else {
    this.query.trim();
    requestBody = {
      query : this.query,
      level : this._level || null
    };
    queryJson = JSON.stringify(requestBody);
  }

  var self = this, searchOptions = {
    uri: this.config.giraffiUrl + '?apikey=' + this.config.apikey,
    method: 'GET',
    body: queryJson,
    headers: {
      'Content-Type': 'application/json'
    }
  };


  common.giraffi(searchOptions, this.callback, function (res, body) {
    self.callback(null, JSON.parse(body));
  });

  return this;
};

