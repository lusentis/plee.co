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

var utils = require('./utils')
  , fs = require('fs')
  , temp = require('temp')
  , coolog = require('coolog')
  , logger = coolog.logger('Plee.co - Routes', true)
  , exec = require('child_process').exec;

/**
 * Grab a web page from an url and create a pdf file
 */
module.exports.grabByUrl = function (req, res) {
  
  var url = req.query.url
    , tempPdfFile = temp.path({suffix: '.pdf'});

  if (!utils.isUrlValid(url)) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify({ 'message' : 'invalid url ' + req.query.url }));
      res.end();
      return;
  }
  
  exec("phantomjs bin/rasterize.js '" + url + "' " + tempPdfFile + " A4", function (error, stdout, stderr) {
    if(error !== null) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify({ 'message' : 'Api error' }));
      res.end();      
      logger.error("Error while creating pdf ", stderr);
      return;
    }

    fs.readFile(tempPdfFile, function (err, data) {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify({ 'message' : 'api error' }));
        res.end();
        logger.error("Error while reading pdf file " + tempPdfFile, err);
        return;
      }

      res.setHeader("Content-Type" , "application/pdf" );
      res.setHeader("Content-Disposition:", "attachment; filename='file.pdf'"); //change with the url
      res.write(data);
      res.end();

      // be sure to delete temp file
      try { 
        fs.unlink(tempPdfFile); 
      } catch (e) {
        logger.warn(e);
      }
    });

  });
}

/**
 * Grab a web page from html code (encoded using base64)
 */
module.exports.createByBase64 = function (req, res) {
  
  var base64Html = req.query.html
    , tempPdfFile = temp.path({suffix: '.pdf'})
    , tempHtmlFile = temp.path({suffix: '.html'});

  if (base64Html == null || base64Html == undefined)  {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify({ 'message' : 'missing parameters (html)' }));
      res.end();    
      return;
  }

  fs.writeFileSync(tempHtmlFile, new Buffer(base64Html, 'base64'));
  
  exec("phantomjs bin/rasterize.js '" + tempHtmlFile + "' " + tempPdfFile + " A4", function (error, stdout, stderr) {
    if(error !== null) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify({ 'message' : 'Api error' }));
      res.end();      
      logger.error("Error while creating pdf ", stderr);
      return;
    }

    fs.readFile(tempPdfFile, function (err, data) {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify({ 'message' : 'api error' }));
        res.end();
        logger.error("Error while reading pdf file " + tempPdfFile, err);
        return;
      }

      res.setHeader("Content-Type" , "application/pdf" );
      res.setHeader("Content-Disposition:", "attachment; filename='file.pdf'"); //change with the url
      res.write(data);
      res.end();

      // be sure to delete temp files
      try { 
        fs.unlink(tempPdfFile); 
      } catch (e) {
        logger.warn(e);
      }

      try { 
        fs.unlink(tempHtmlFile); 
      } catch (e) {
        logger.warn(e);
      }
    });
  });  
}
