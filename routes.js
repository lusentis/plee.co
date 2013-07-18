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

var A4_WIDTH

var utils = require('./utils')
  , fs = require('fs')
  , temp = require('temp')
  , coolog = require('coolog')
  , logger = coolog.logger('Plee.co - Routes', true)
  , phantom = require('node-phantom')
  , PDFDocument = require('pdfkit');

/**
 * Grab a web page from an url and create a pdf file
 */
module.exports.grabByUrl = function (req, res) {
  
  var url = req.query.url
    , tempImageFileName = temp.path({suffix: '.jpg'});

  if (!utils.isUrlValid(url)) {
      res.statusCode = 202;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify({ 'message' : 'invalid url ' + req.query.url }));
      res.end();
  }

  phantom.create(function (err, ph) {
  ph.createPage(function (err, page) {
    page.open(url, function (err, status) {
      page.render(tempImageFileName, function (err) {
        var pdf = new PDFDocument();

        if (err) {
          logger.error("Error while creating image ", err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.write(JSON.stringify({ 'message' : 'Api error' }));
          res.end();            
        } else {
          pdf.image(tempImageFileName, 0, 0, {
            fit : [545, 842]
          });
          pdf.output(function (repr) {
            res.setHeader('Content-Length', repr.length);
            res.setHeader('Content-Type', 'application/pdf; charset=utf-8');
            res.write(new Buffer(repr,'binary'));
            res.end();
            try { 
              fs.unlink(tempImageFileName); 
            } catch (e) {}
          })
        }
        ph.exit();
      });
    });
  });
});



}

/**
 * Grab a web page from html code (encoded using base64)
 */
module.exports.createByBase65 = function (req, res) {
  res.write("creating by base64");
  res.end();
}
