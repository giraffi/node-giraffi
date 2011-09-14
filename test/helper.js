/*
 *  helper.js: A set of helper methods
 *
 */

var fs = require('fs')
  , util = require('util')
  , path = require('path')
  , vows = require('vows')
  , assert = require('assert')
  , giraffi = require('../lib/giraffi');

var helper = exports;
helper.checkConfig = function (config) {
  return config
      && config.host !== 'localhost:8000'
      && config.apikey !== '1234567890';
};

helper.parseConfig = function () {
  try {
    var configFile = path.join(__dirname, 'fixtures', 'test-config.json')
      , config = JSON.parse(fs.readFileSync(configFile).toString());

    if (!helper.checkConfig(config)) {
      util.puts("Test config file is not valid");
      process.exit(0);
    }

    helper.config = config || {};
    return config || {};
  }
  catch (ex) {
    util.puts('Error while parsing test-config.json');
    ex.stack.split('\n').forEach(function (line) {
      console.log(line);
    });

    process.exit(0);
  }
};
