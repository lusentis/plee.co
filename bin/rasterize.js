/*jshint node:true, indent:2 */
/*global phantom, window */

// source: https://github.com/ariya/phantomjs/blob/master/examples/rasterize.js

'use strict';

var page = require('webpage').create(),
  system = require('system'),
  address, output, size;

//console.log('--------> ', system.args);

/*
if (system.args.length < 3 || system.args.length > 5) {
  console.log('Usage: rasterize.js URL filename [paperwidth*paperheight|paperformat] [orientation] [zoom]');
  console.log('  paper (pdf output) examples: "5in*7.5in", "10cm*20cm", "A4", "Letter"');
  phantom.exit(127);
} else {
*/  
  address = system.args[1];
  output = system.args[2];
  
  //page.viewportSize = { width: 600, height: 600 };
  if (system.args.length > 3 && system.args[2].substr(-4) === ".pdf") {
    size = system.args[3].split('*');
    page.paperSize = size.length === 2 ? { width: size[0], height: size[1], margin: '0px' }
                       : { format: system.args[3], orientation: system.args[4], margin: '0cm' };
  }
  
  if (system.args.length >= 5) {
    page.zoomFactor = system.args[5];
  }
   
  page.open(address, function (status) {
    if (status !== 'success') {
      console.log('Unable to load the address! ', status);
      phantom.exit(2);
    } else {
      page.render(output);
      phantom.exit(0);
    }
  });
//}