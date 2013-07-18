/*jshint node:true, laxcomma:true, indent:2, white:true, curly:true, undef:true, unused:true, strict:true, trailing:true, eqnull:true */

'use strict';

var API_PORT = 3000; // change with ENV variable?

var coolog = require('coolog')
  , logger = coolog.logger('Plee.co', true)
  , connect = require('connect')
  , asciify = require('asciify')
  , http = require('http');


var app = connect();

/**
 * API server
 */
app.use(connect.query());
app.use(function (req, res) {
  res.write("Received");
  res.end();
});



http.createServer(app).listen(API_PORT, function () {
  logger.ok('API Server listening on port ' + API_PORT + '.');
});