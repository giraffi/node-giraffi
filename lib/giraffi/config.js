/*
 * config.js
 *   configuration for app.js
 */

var Config = exports.Config = function (defaults) {
  if (!defaults) defaults = {}; // allow default setting

  if (defaults.apikey || process.env.GIRAFFI_APIKEY) {
    this.host   = defaults.host || process.env.GIRAFFI_URL || "lapi.giraffi.jp:3443";
    this.apikey = defaults.apikey || process.env.GIRAFFI_APIKEY;
    this.ssl    = defaults.ssl || true;
  } else {
    var fs = require('fs');

    fs.readFile('~/.giraffi/APIKEY', function(err, data) {
      if (err) throw err;
      
      this.host   = defaults.host || process.env.GIRAFFI_URL || "lapi.giraffi.jp:3443";
      this.apikey = data;
      this.ssl    = defaults.ssl || true;
    });
  }	
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
