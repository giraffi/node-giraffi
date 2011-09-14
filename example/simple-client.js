/*
 * simple-client.js : A sample client that posts logs to Giraffi Monitoring-as-a-Service
 *
 */

var giraffi = require('../lib/giraffi')
  , util = require('util');

var config = {
  host: "localhost:8004",
  apikey: "12345"
};

var client = giraffi.createClient(config);

// Logging with a callback function
client.level('info').logger('123456789ABCDEFG', function (err, result) {
  console.log("Result ->", result);
});

// Logging without a callback function
// client.level('info').logger('123456789ABCDEFG');

// search logs with a query string "404"
/*
client.search('404', function (err, results) {
  console.log("Raw results -> ", results);
});
*/
