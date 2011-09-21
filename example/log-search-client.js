/*
 * log-search-client.js : A sample client that gets logs from Giraffi Monitoring-as-a-Service.
 *
 */

// lib dependencies
var giraffi = require('../lib/giraffi')
  , util = require('util');

// configuration
var config = {
  host: "localhost:3000",
  apikey: "1234567890"
};

// create a client object
var client = giraffi.createClient(config);

// start searching with "log message"
// level() method is optional
client.level('info').search('', function (err, results) {
  console.log("results: ", results);
});
