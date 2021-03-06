/*
 * config.js
 *   configuration for app.js
 */

var Config = exports.Config = function (defaults) {
  if (!defaults) defaults = {}; // allow default setting

  this.host   = defaults.host || process.env.GIRAFFI_URL || "lapi.giraffi.jp:3443";
  this.apikey = defaults.apikey || process.env.GIRAFFI_APIKEY;
  this.type = defaults.type || "app";

  if (typeof defaults.ssl === "undefined") {
    this.ssl = true;
  } else {
    this.ssl = defaults.ssl;
  }

  if (!this.apikey) {
    try {
      var fs = require('fs');
      this.apikey = fs.readFileSync(process.env.HOME + "/.giraffi/APIKEY", "UTF-8").replace(/[\n\s]/g, "");
    } catch (e) {
      // TODO error handling
    }
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

  get type () {
    return this._type;
  },

  set type (value) {
    this._type = value;
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
