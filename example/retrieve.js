/*
 * retrieve.js
 *  A sample client that retrieve logs from Giraffi Applog Server.
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

// Start retrieving logs
//
// `level()` and `limit()` method are optional.

// default limit value : 10 
// max limit value : 100

client.level('info').limit(5).retrieve('', function (err, results) {
  console.log("results: ", results);
});
