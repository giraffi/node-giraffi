/*
 * logger-with-no-callback.js
 *    A sample client that posts logs to Giraffi Applog Server.
 *    This client doesn't use a callback function.
 */

// Lib dependencies
var giraffi = require('../lib/giraffi')
  , util = require('util');

// Configuration
var config = {
  host: "localhost:3000",
  apikey: "12345"
};

// Create a `client` object
var client = giraffi.createClient(config);

// Start logging with no callback function.
// `level()` method is optional.
client.level('info').logger('123456789ABCDEFG');
