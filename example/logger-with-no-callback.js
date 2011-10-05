/*
 * logger-with-no-callback.js
 *    A sample client that posts logs to Giraffi Applog Server.
 *    This client doesn't use a callback function.
 */

// Load giraffi
var giraffi = require('../lib/giraffi');

// Setup a applog server
var config = {
  host: "localhost:3000",
  apikey: "12345"
};

// Create a client object and start posting logs 
var client = giraffi.createClient(config);
client.level('info').logger('foo bar hoge');
