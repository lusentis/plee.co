/*jshint node:true, laxcomma:true, indent:2, eqnull:true, unused:true */

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

var PORT = process.env.PORT || 3000
  , APIKEY = process.env.APIKEY;

var coolog = require('coolog')
  , logger = coolog.logger('app.js', true)
  , connect = require('connect')
  , http = require('http')
  , routes = require('./routes.js');

var app = connect();
app.use(connect.query());
app.use(connect.urlencoded({ limit: 1024 * 1024 })); // 2MB size limit for POST requests (use GET /?url= for larger ones)
app.use(requireAPIKey(APIKEY));
app.use(router);


function requireAPIKey(required_apikey) {  
  if (!required_apikey) {
    throw new Error('Please provide an APIKEY.');
  }

  return function _requireAPIKeyMiddleware(req, res, next) {
    var apikey = req.query.apikey;
    
    if (apikey !== required_apikey) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify({ error: 'E_INVALID_API_KEY', message: 'The API key you provided is not valid.' }));
      res.end();
    } else {
      next();
    }
  };
}


function router(req, res, next) {
  
  if ('GET' === req.method && req.query.url) {
    routes.byURL(req.query.url, req, res);

  } else if ('GET' === req.method && req.query.html) {
    routes.byHTML(req.query.html, req, res);
    
  } else if ('POST' === req.method && req.body.html) {
    routes.byHTML(req.body.html, req, res);
  
  } else {
    next();
  }
}


http.createServer(app).listen(PORT, function () {
  logger.debug('Started at', new Date().toISOString());
  logger.ok('Plee.co API server listening on port ' + PORT + '.');
});
