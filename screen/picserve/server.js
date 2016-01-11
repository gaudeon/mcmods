'use strict';

var express     = require('express'),
    body_parser = require('body-parser'),
    jpeg        = require('jpeg-js'),
    exec        = require('child_process').exec,
    fs          = require('fs'),
    wool_color  = require('./lib/wool_color');

// Globals
var PORT = 8080;

// Server
var server = module.exports.server = exports.server = express();

// form body parsing
server.use(body_parser.json());
server.use(body_parser.urlencoded({ extended: true}));

server.get('/:width/:height', function(req, res) {
    get_pic(req.params.width, req.params.height, function(pixels) {
        res.json(pixels);
    });
});

server.listen(PORT);
console.log('Running on http://localhost:' + PORT);

/* --- FUNCTIONS --- */
function get_pic(width, height, callback) {

    if ('function' !== typeof callback) callback = function() {};

    var camcmd   = 'raspistill';
    var img_file = __dirname + '/.picam.jpg';

    // e.g. raspistill -w 64 -h 48 -o filename.jpg
    var cmd = camcmd
                + " -w " + width
                + " -h " + height
                + " -o " + img_file;


    exec(cmd, function(error, stdout, stderr) {
        var file   = fs.readFileSync(img_file);
        var raw    = jpeg.decode(file);
        var pixels =  [];

        // each pixel is rgba 
        for (var i = 0; i < raw.width * raw.height * 4; i += 4) {
            var r = raw.data[i],
                g = raw.data[i+1],
                b = raw.data[i+2],
                a = raw.data[i+3];

            pixels.push(closest_color(r,g,b)); 
        }

        callback(pixels);
    }); 
}

var COLOR_CACHE = {};
function closest_color(r, g, b) {
    var cache_id = r + ':' + g + ':' + b;

    if ('undefined' !== typeof COLOR_CACHE[cache_id]) {
        return COLOR_CACHE[cache_id];
    }

    var color = -1,
        match = 1000;

    for (var c = 0; c < wool_color.length; c++) {
        var cur_match = Math.abs(r - wool_color[c].color.r) + Math.abs(g - wool_color[c].color.g) + Math.abs(b - wool_color[c].color.b);

        if(cur_match < match) {
            match = cur_match;
            color = c;
        }
    }

    COLOR_CACHE[cache_id] = color;
    return color;
}
