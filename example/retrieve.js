/*
 * retrieve.js
 *    A sample client that retrieve logs from Applog server.
 */

// Lib dependencies
var giraffi = require('../lib/giraffi')
  , util = require('util');

// Configuration
var config = {
  host: "localhost:3000",
  apikey: "1234567890"
};

// Create client object
var client = giraffi.createClient(config);

client.level('info').limit(5).retrieve('', function (err, results) {
  console.log("results: ", results);
});
