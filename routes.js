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

require('string-format');

var temp = require('temp')
  , coolog = require('coolog')
  , logger = coolog.logger('routes.js', true)
  , fs = require('fs')
  , spawn = require('child_process').spawn
  , utils = require('./utils');


function _rasterize(source, destination, filename, orientation, papersize, zoom, res, next) {
  logger.log('Rasterize called');
  
  console.log('phantomjs bin/rasterize.js '+source+' '+destination+" " + papersize + " " + orientation + " " + zoom);
  var phantom = spawn('phantomjs', ['--ignore-ssl-errors=yes', 'bin/rasterize.js', source, destination, papersize, orientation, zoom], { stdio: 'ignore' });
  
  phantom.on('close', function (code) {
    if (code !== 0) {
      logger.error('Error executing PhantomJS, exit code:', code);
      
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify({ error: 'E_500', message: 'Server error' }));
      res.end();
      return;
    }
    
    logger.log('Phantom ok.');
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition:', 'attachment; filename="' + filename + '.pdf"'); //change with the url
    
    var pdf = fs.createReadStream(destination);
    pdf.pipe(res);
    pdf.on('end', next);
  });
}


/**
 * Grab a web page from an url and create a pdf file
 */
module.exports.byURL = function (url, req, res) {
  var tempPDFPath = temp.path({suffix: '.pdf'})
    , filename = req.query.filename || 'page'
    , orientation = req.query.orientation || 'portrait'
    , papersize = req.query.size || 'A4'
    , zoom = parseFloat(req.query.zoom) || '1'
    ;

  filename = utils.sanitizeFilename(filename);

  logger.log('Grabbing URL', url);
  logger.log('Filename', filename);

  if (!utils.isUrlValid(url)) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify({ error: 'E_INVAID_PARAMETER', message: 'Missing or nvalid parameter: `URL`' }));
    res.end();
    return;
  }
    
  _rasterize(url, tempPDFPath, filename, orientation, papersize, zoom, res, function () {
    logger.ok('Rasterize from URL completed.');
    res.end();
    
    // delete temp files
    try { 
      fs.unlink(tempPDFPath); 
    } catch (e) {
      logger.warn('Cannot delete temp PDF file:', e);
    }
  });
};


/**
 * Grab a web page from html code (encoded using base64)
 */
module.exports.byHTML = function (HTMLContent, req, res) {
  var tempHTMLPath = temp.path({suffix: '.html'})
    , tempPDFPath = temp.path({suffix: '.pdf'})
    , filename = req.query.filename || 'page'
    , orientation = req.query.orientation || 'portrait'
    , papersize = req.query.size || 'A4'
    , zoom = req.query.zoom || '1'
    ;

  filename = utils.sanitizeFilename(filename);

  logger.log('Filename', filename);

  if (!HTMLContent || HTMLContent.length === 0)  {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify({ error: 'E_INVALID_PARAMETER', message: 'Missing or invalid parameter: `html`' }));
    res.end();    
    return;
  }
  
  fs.writeFile(tempHTMLPath, new Buffer(HTMLContent, 'base64'), function (err) {
    if (err) {
      logger.error('Cannot write temporary HTML file', err);
      
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify({ error: 'E_500', message: 'Server error' }));
      res.end();
      return;
    }
    
    _rasterize(tempHTMLPath, tempPDFPath, filename, orientation, papersize, zoom, res, function () {
      logger.ok('Rasterize from HTML completed.');
      res.end();
      
      // delete temp files
      try { 
        fs.unlink(tempPDFPath); 
      } catch (e) {
        logger.warn('Cannot delete temp PDF file:', e);
      }

      try { 
        fs.unlink(tempHTMLPath);
      } catch (e) {
        logger.warn('Cannot delete temp HTML file:', e);
      }
    });
  });
};
