/*
 * logger.js
 *    A sample client that posts logs to the Applog Server.
 *
 */

// Lib dependencies
var giraffi = require('../lib/giraffi')
  , util = require('util');

// Configuration
var config = {
  host: "localhost:3000"
};

// Create a client object
var client = giraffi.createClient(config);

// Start logging with a callback function
// the `level()` method is optional
client.level('info').logger("hoge hoge log message", function (err, result) {
  console.log("result: ", result);
});
