/*
 * logger-with-callback.js : A sample client that posts logs to Giraffi Monitoring-as-a-Service.
 *
 */

// lib dependencies
var giraffi = require('../lib/giraffi')
  , util = require('util');

// configuration
var config = {
  host: "localhost:3000",
  apikey: "12345"
};

// create a client object
var client = giraffi.createClient(config);

// start logging with a callback function
// the level() method is optional

console.log("level: ", client.level('debug'));

client.level('info').logger('123456789ABCDEFG', function (err, result) {
  console.log("result: ", result);
});
