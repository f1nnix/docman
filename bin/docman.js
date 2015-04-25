#!/usr/bin/env node

var path = require('path');
var docman = require('../lib/docman.js');

var dumpFile = '';
var postman = {};

// Parse Postman dump
try {
  dumpFile = path.resolve(process.argv[2])
  postman  = require(dumpFile)
} catch (e) {
  raiseError('no_dump')
}

// determine output dir
// failback to $JSON/docs if possible
try {
  var outputDir = ''

  if (process.argv[3]) {
    outputDir = path.resolve(process.argv[3])
  } else {
    outputDir = path.dirname(dumpFile) + '/docs'
  }
} catch (e) {
  console.log('Error! Can\'t read ');
}

console.log('Postman dump file path: ' + dumpFile)
console.log('Output directory: ' + outputDir)

// Start processing
docman(postman, outputDir)

/**
 * [raiseError Loggs error for requested exception and exits app
 * @param  {string} code Error slug
 */
function raiseError(code) {
  try {
    switch (code) {
      case 'no_dump':
        console.log('[ERROR] Can\'t read Postman JSON dump! Aboring')
        process.exit(1);
        break;
    }

  } catch (e) {
    console.log('Unhandled error. Aboring')
  }
}
