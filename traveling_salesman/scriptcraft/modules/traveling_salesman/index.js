var config   = require('traveling_salesman/config'),
    Map      = require('traveling_salesman/map'),
    Path     = require('traveling_salesman/path'),
    Renderer = require('traveling_salesman/renderer'),
    utils    = require('traveling_salesman/utils');

/*
 * TravelingSalesman
 *
 * Description: Setup and execute a traveling salesman experiment
 *
 * Parameters:
 *  sender      - who is calling this
 *  callback    - callback called when initialization is complete
 */
var TravelingSalesman = function (sender, callback) {
    if("function" !== typeof callback) callback = function() {}; // callback should always be a function

    var self = {};

    var __init_ran = false;

    var __map, __path, __renderer;

    function _initialize() {
        var error;

        self.player = sender;

        callback(error, self);
    }

    function _checkForInit() {
        if (! __init_ran) {
            self.player.chat('Please run /ts init before attempting other sub commands.');
            return false;
        }

        return true;
    }

    self.init = function(points, map_size, callback) {
        if("function" !== typeof callback) callback = function() {}; // callback should always be a function

        var error;

        if ( "number" !== typeof points || points < config.minimum_points ) {
            error = "Number of points specific is invalid. Must be a minimum of 2";

            callback(error,self);

            return;
        }

        if ( "number" !== typeof map_size || map_size < config.minimum_map_size ) {
            error = "Number of points specific is invalid. Must be a minimum of 5";

            callback(error,self);

            return;
        }

        if (__init_ran) {
            self.clear(); // clear out map if we are running init again
        }

        new Map(points, map_size, sender, function(error, theMap) {
            if (! error) {
                __map = theMap;

                new Path(__map, sender, function(error, thePath) {
                    if (! error) {
                        __path = thePath;

                        new Renderer(sender, function(error, theRenderer) {
                            if (! error) {
                                __renderer = theRenderer;

                                __init_ran = true;

                                self.player.chat('Map creation started.');

                                __renderer.renderMap( __map.getFlatMap(), undefined, function() {
                                    __renderer.renderPaths( __path.getPaths(), function() {
                                        self.player.chat('Map creation finished.');
                                    });
                                });

                                callback(error, self);
                            }
                            else {
                                callback(error, self);
                            }
                        });
                    }
                    else {
                        callback(error, self);
                    }
                });
            }
            else {
                callback(error, self);
            }
        });
    };

    self.path = function(src, dest, callback) {
        if("function" !== typeof callback) callback = function() {}; // callback should always be a function

        var error;

        if (_checkForInit()) {
            var p1     = src - 1;
            var p2     = dest - 1;
            var points = __map.getPoints();

            if (p1 != p2 && "undefined" !== typeof points[p1] && "undefined" !== typeof points[p2]) {
                __renderer.drawLine(points[p1], points[p2]);

                // Todo, Create another object for calculating shortest path (path.js) and have it return the list of point to point travels so lines can be draw between each
            }
            else {
                self.player.chat('Either one, or both, of the points provided is invalid.');
                self.player.chat('Make sure both points are unique and valid. (point id\'s starts at 1)');
            }
        }

        callback(error, self);
    };

    self.reset = function(callback) {
        if("function" !== typeof callback) callback = function() {}; // callback should always be a function

        var error;

        if (_checkForInit()) {
            self.player.chat('Map creation started.');

            __renderer.renderMap( __map.getFlatMap(), undefined, function() {
                self.player.chat('Map creation finished.');
            });
        }

        callback(error, self);
    };

    self.clear = function(callback) {
        if("function" !== typeof callback) callback = function() {}; // callback should always be a function

        var error;

        if (_checkForInit()) {
            self.player.chat('Map removal started.');

            __renderer.renderMap( __map.getFlatMap(), true, function() {
                self.player.chat('Map removal finished.');
            });

            __init_ran = false;
        }

        callback(error, self);
    };

    self.print = function(state, callback) {
        switch (state) {
            case 'colors':
                var colors = __renderer.getColors();

                for (var c = 0; c < colors.length; c++) {
                    self.player.chat(c + ': ' + colors[c]);
                }

                break;
            case 'points':
                var points = __map.getPoints();
                var colors = __renderer.getColors();

                for (var p = 0; p < points.length; p++) {
                    self.player.chat(p + ': ' + points[p].x + '/' + points[p].y + '/' + points[p].z + ' ' + colors[p]);
                }

                break;
            case 'paths':
                var paths  = __path.getPaths();
                var colors = __renderer.getColors();

                for (var p = 0; p < paths.length; p++) {
                    self.player.chat(paths[p].p1_index + ' (' + colors[paths[p].p1_index] + ') -> ' + paths[p].p2_index + ' (' + colors[paths[p].p2_index] + ')');
                }

                break;
            default:
                self.player.chat(state + ' not found');
        }
    };

    _initialize();

    return self;
};

module.exports = TravelingSalesman;
