'use strict';

var express    = require('express'),
    body_parser = require('body-parser');

// Globals
var PORT = 8080;

// Server
var server = module.exports.server = exports.server = express();

// form body parsing
server.use(body_parser.json());
server.use(body_parser.urlencoded({ extended: true}));

server.get('/', function(req, res) {
});

server.listen(PORT);
console.log('Running on http://localhost:' + PORT);

/* --- FUNCTIONS --- */
