/*
 *  giraffi-test.js
 *    Tests lib/giraffi.js with Vows
 */

var path = require('path')
  , vows = require('vows')
  , assert = require('assert')
  , helper = require('./helper');

var options = {}
  , config = helper.parseConfig()
  , giraffi = require('../lib/giraffi').createClient(config);

vows.describe('node-giraffi/lib/giraffi').addBatch({
  "When using the logger() method" : {
    "with a callback function" : {
      "when the level param is set" : {
        topic: function () {
          giraffi.level('info').logger('foo bar hoge', this.callback);
        },
        "should successfully post a log to the Applog Server" : function (err, results) {
          assert.isNull(err);
          assert.isObject(results);
        }
      },
      "when the level param is not set" : {
        topic: function () {
          giraffi.logger('foo bar hoge', this.callback);
        },
        "should successfully post a log to the Applog Server" : function (err, results) {
          assert.isNull(err);
          assert.isObject(results);
        }
      }
    },
    "with no callback function" : {
      "when the level param is set" : {
        topic: function () {
          var emitter = giraffi.level('info').logger('foo bar hoge');
          emitter.on('logger', this.callback.bind(null, null));
        },
        "should successfully post a log to the Applog Server" : function (err, results) {
          assert.isNull(err);
          assert.isObject(results);
        }
      },
      "when the level param is not set" : {
        topic: function () {
          var emitter = giraffi.logger('foo bar hoge');
          emitter.on('logger', this.callback.bind(null, null));
        },
        "should successfully post a log to the Applog Server" : function (err, results) {
          assert.isNull(err);
          assert.isObject(results);
        }
      }
    }
  },

  "When using the retrieve() method" : {
    "with a valid query" : {
      "when the level param is set to 'info'" : {
        topic: function () {
          giraffi.level('info').retrieve('foo', this.callback);
        },
       "should retrieve all the results whose level is 'info' and message contains the string 'foo'" : function (err, results) {
          assert.isNull(err);
          assert.isArray(results);
          assert.equal(results[0].level, 'info');
          assert.match(results[0].message, /foo/);
        }
      },
      "when the level param is not set" : {
        topic: function () {
          giraffi.retrieve('foo', this.callback);
        },
       "should retrieve all the results containing the string 'foo' in the 'message'" : function (err, results) {
          assert.isNull(err);
          assert.isArray(results);
          assert.match(results[0].message, /foo/);
        }
      },
      "when the limit param is set to 1" : {
        topic: function () {
          giraffi.limit(1).retrieve('foo', this.callback);
        },
       "should retrieve only 1 result containing the string 'foo' in the 'message'" : function (err, results) {
          assert.isNull(err);
          assert.isArray(results);
          assert.length(results, 1);
          assert.match(results[0].message, /foo/);
        }
      }
    }
  }
}).export(module);
