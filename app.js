/*jshint node:true, laxcomma:true, indent:2, white:true, curly:true, undef:true, unused:true, strict:true, trailing:true, eqnull:true */

'use strict';

/*
 * 
 * ## LICENSE ##
 * 
 * Copyright (C) 2013 Plastic Panda
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 * 
 */

var API_PORT = 3000; // change with ENV variable?

var coolog = require('coolog')
  , logger = coolog.logger('Plee.co', true)
  , connect = require('connect')
  , asciify = require('asciify')
  , http = require('http')
  , routes = require('./routes.js')
  , url = require('url');


var app = connect()
          .use(connect.query())
          .use(validateKey)
          .use(dispatch);


function validateKey (req, res, next) {
  // TODO: implement
  next();
}

function dispatch (req, res, next) {
  var path = url.parse(req.url).pathname;

  if ('GET' === req.method && '/byurl' === path) {
    routes.grabByUrl(req, res);

  } else if ('GET' === req.method && '/byhtml' === path) {
    routes.createByBase65(req, res);

  } else {
    res.statusCode = 400;
    res.write('Bad request for ' + path);
    res.end();
  }
}


http.createServer(app).listen(API_PORT, function () {
  logger.ok('API Server listening on port ' + API_PORT + '.');
});