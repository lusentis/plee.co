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


/**
 * Grab a web page from an url and create a pdf file
 */
module.exports.grabByUrl = function (req, res) {
  res.write("grabbing by url");
  res.end();
}

/**
 * Grab a web page from html code (encoded using base64)
 */
module.exports.createByBase65 = function (req, res) {
  res.write("creating by base64");
  res.end();
}
