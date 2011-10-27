/*
 * retrieve.js
 *    A sample client that retrieve logs from your Applog Server.
 */

// Load giraffi
var giraffi = require('../lib/giraffi');

// Define a applog server
var config = {
  host: "localhost:3000",
  ssl: false
};

// Create a client object and start retrieving logs
var client = giraffi.createClient(config);

client.level('info').limit(3).retrieve('foo', function (err, results) {
  console.log("results: ", results);
});
