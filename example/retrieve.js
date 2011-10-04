/*
 * retrieve.js
 *    A sample client that retrieve logs from Applog server.
 */

// Load giraffi
var giraffi = require('../lib/giraffi')
  , util = require('util');

// Setup a applog server
var config = {
  host: "localhost:3000"
};

// Create a client object and start retrieving logs
var client = giraffi.createClient(config);
client.level('info').limit(3).retrieve('foo', function (err, results) {
  console.log("results: ", results);
});
