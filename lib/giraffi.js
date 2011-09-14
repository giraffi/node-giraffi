/*
 * giraffi.js: wrapper for node-giraffi object
 *
 */

var giraffi = exports;

/*
 * Expose version through `pkginfo`.
 */
require('pkginfo')(module, 'version');

giraffi.createClient = require('./giraffi/core').createClient;
