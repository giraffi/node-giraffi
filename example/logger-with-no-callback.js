/*
 * logger-with-no-callback.js
 *    A sample client that posts logs to your Applog Server.
 *    This client doesn't use a callback function.
 */

// Load giraffi
var giraffi = require('../lib/giraffi');

// Define a applog server
var config = {
  host: "localhost:3000"
};

// Create a client object and start posting logs 
var client = giraffi.createClient(config);
client.level('info').logger('foo bar hoge');
