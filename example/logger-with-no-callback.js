/*
 * logger-with-no-callback.js : A sample client that posts logs to Giraffi Monitoring-as-a-Service.
 *
 */

// lib dependencies
var giraffi = require('../lib/giraffi')
  , util = require('util');

// configuration
var config = {
  host: "localhost:8004",
  apikey: "12345"
};

// create a `client` object
var client = giraffi.createClient(config);

// start logging with no callback function
// `level()` method is optional
client.level('info').logger('123456789ABCDEFG');

