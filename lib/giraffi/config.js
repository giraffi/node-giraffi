/*
 * config.js
 *   configuration for app.js
 */

var Config = exports.Config = function (defaults) {
  if (!defaults.host) {
    throw new Error('Host not allowed to be empty');
  }

  this.host   = defaults.host;
  this.apikey = defaults.apikey || process.env.GIRAFFI_KEY;
  this.ssl    = defaults.ssl || false;
};

exports.createConfig = function (defaults) {
  return new Config(defaults);
};

Config.prototype = {
  get host () {
    return this._host;
  },

  set host (value) {
    this._host = value;
  },

  get apikey () {
    return this._apikey;
  },

  set apikey (value) {
    this._apikey = value;
  },

  get ssl () {
    return this._ssl;
  },

  set ssl (value) {
    this._ssl = value;
  },

  get giraffiUrl () {
    var protocol;

    if (this._ssl) {
      protocol = 'https://'
    } else {
      protocol = 'http://'
    }
    return protocol + this._host + '/applogs.json';
  }
};
