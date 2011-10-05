node-giraffi
============

A pretty client that posts and retrieves your app logs

Requirements
---------------

* Node.js 0.4.11 or higher
* Applog server (e.g. [giraffi-applog](https://github.com/giraffi/giraffi-applog))

Usage
---------------

__Setup__

First, setup a applog server(here we use [giraffi-applog](https://github.com/giraffi/giraffi-applog)) on your localhost.

     git clone git://github.com/giraffi/giraffi-applog.git giraffi-applog
     cd giraffi-applog/
     gem install bundler
     bundle install --path vendor/bundle
     mongod --nojournal --dbpath ~/mongodb-xxx-xxx_xx-2.0.0/your-dbpath
     rake test
     bundle exec rackup -s thin -p 3000 config.ru
 
Then install `node-giraffi` using `npm`.
  
     npm install giraffi 
     
__Start logging__

To post logs:
     
     // Load giraffi
     var giraffi = require('giraffi');

     // Define a applog server
     var config = {
       host: "localhost:3000"
     };

     // Create a client object and start posting logs 
     var client = giraffi.createClient(config);
     // Post a log whose level is 'info' and message is 'foo bar hoge'
     client.level('info').logger("foo bar hoge", function (err, result) {
       console.log("result: ", result);
     });
 
To retrieve logs:

     // Load giraffi
     var giraffi = require('giraffi');

     // Define a applog server
     var config = {
       host: "localhost:3000"
     };

     // Create a client object and start retrieving logs
     var client = giraffi.createClient(config);

     // Retrieve '5' logs whose level is 'info' and message contains the string 'foo'
     client.level('info').limit(5).retrieve('foo', function (err, results) {
       console.log("results: ", results);
     });


Please see `example/logger.js` and `example/logger-with-no-callback.js` for how to post logs and `example/retrieve.js` for how to get logs.

Run tests
---------------

You must start a applog server on your local port 3000 or other(please edit `test/fixtures/test-config.json`) before running tests. All of the tests are written in [Vows](http://vowsjs.org/).
   
     npm test giraffi


