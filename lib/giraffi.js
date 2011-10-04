/*
 * giraffi.js 
 *    The wrapper for node-giraffi object
 *
 */
var giraffi = exports;

require('pkginfo')(module, 'version');
giraffi.createClient = require('./giraffi/app').createClient;
