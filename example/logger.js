/*
 * logger.js
 *   A sample client that posts logs to Giraffi Applog Server.
 *
 */

// Lib dependencies
var giraffi = require('../lib/giraffi')
  , util = require('util');

// Configuration
var config = {
  host: "localhost:3000",
  apikey: "12345"
};

// Create a client object
var client = giraffi.createClient(config);

// Start logging with a callback function
// the `level()` method is optional
client.level('info').logger("log message", function (err, result) {
  console.log("result: ", result);
});