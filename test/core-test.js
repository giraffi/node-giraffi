/*
 *  core-test.js:  Tests lib/core.js with Vows
 *
 */

var path = require('path')
  , vows = require('vows')
  , assert = require('assert')
  , helper = require('./helper');

var options = {}
  , config = helper.parseConfig()
  , giraffi = require('../lib/giraffi').createClient(config);

vows.describe('node-giraffi/core').addBatch({
  "When using the logger() method" : {
    "with a callback function" : {
      "when setting a log level" : {
        topic: function () {
          giraffi.level('info').logger('foo bar hoge', this.callback);
        },
        "should send a log to Giraffi" : function (err, results) {
          assert.isNull(err);
          assert.isObject(results);
        }
      },
      "when not setting a log level" : {
        topic: function () {
          giraffi.logger('foo bar hoge', this.callback);
        },
        "should send a log to Giraffi" : function (err, results) {
          assert.isNull(err);
          assert.isObject(results);
        }
      }
    },
    "without a callback function" : {
      "when setting a log level" : {
        topic: function () {
          var emitter = giraffi.level('info').logger('foo bar hoge');
          emitter.on('logger', this.callback.bind(null, null));
        },
        "should post a log to Giraffi" : function (err, results) {
          assert.isNull(err);
          assert.isObject(results);
        }
      },
      "when not setting a log level" : {
        topic: function () {
          var emitter = giraffi.level('info').logger('foo bar hoge');
          emitter.on('logger', this.callback.bind(null, null));
        },
        "should post a log to Giraffi" : function (err, results) {
          assert.isNull(err);
          assert.isObject(results);
        }
      }
    }
  },
  "When using the search() method" : {

    "with a valid query" : {
      "when no setting a log level" : {
        topic: function () {
          giraffi.search('foo bar hoge', this.callback);
        },
       "should get search results" : function (err, results) {
          assert.isNull(err);
          assert.isObject(results);
          assert.isTrue(typeof results._id !== 'undefined');
          assert.isTrue(typeof results.time !== 'undefined');
        }
      },
      "when setting a log level" : {
        topic: function () {
          giraffi.level('info').search('foo bar hoge', this.callback);
        },
       "should get search results" : function (err, results) {
          assert.isNull(err);
          assert.isObject(results);
          assert.isTrue(typeof results._id !== 'undefined');
          assert.isTrue(typeof results.time !== 'undefined');
        }
      }
    }
  }
}).export(module);
