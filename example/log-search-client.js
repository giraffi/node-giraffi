/*
 * log-search-client.js : A sample client that gets logs from Giraffi Monitoring-as-a-Service.
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

// create a client object
var client = giraffi.createClient(config);

// start searching with "log message"
// level() method is optional
client.level('error').search('log message', function (err, results) {
  console.log("results: ", results);
});
