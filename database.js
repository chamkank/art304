/** Handles connecting to database pool.
 * To use, just import this file and call database.query (see database_test.js) */

var pg = require('pg');
var config = require('config');
var { Pool, ___ } = require('pg')

// Connect to database via pooling
var conString = config.get('db.conString');
const database = new Pool({
  connectionString: conString
})

module.exports = database;