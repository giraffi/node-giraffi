/*
 * config.js
 *
 */

exports.createConfig = function (defaults) {
  return new Config(defaults);
};

var Config = exports.Config = function (defaults) {

  if (!defaults.host) {
    throw new Error('Host not allowed to be empty');
  }

  // hostname: applogs.giraffi.jp
  this.host   = defaults.host;
  this.apikey = defaults.apikey || process.env.GIRAFFI_KEY;
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

  get giraffiUrl () {
    // return 'https://' + this._host + '/applogs.json';
    return 'http://' + this._host + '/applogs.json';
  }
}
