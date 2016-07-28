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

        var time_start = utils.time();
        self.player.chat('Init started.');

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


                                __renderer.renderPoints( __map.getPoints(), function() {
                                    var time_diff = (utils.time() - time_start) / 1000;
                                    self.player.chat('Init finished. ' + time_diff + ' seconds');
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

    self.path = function(p1, callback) {
        if("function" !== typeof callback) callback = function() {}; // callback should always be a function

        var error;

        if (_checkForInit()) {
            var points = __map.getPoints();

            if ("undefined" !== typeof points[p1]) {
                __renderer.clearPaths( __path.getPaths(), function() { // clear old paths first
                    var time_start = utils.time();
                    var paths      = __path.bestPath(p1);
                    var time_diff  = (utils.time() - time_start) / 1000;

                    __renderer.renderPaths( paths, function() {
                        self.player.chat('Pathing finished. ' + time_diff + ' seconds');
                    });
                });
            }
            else {
                self.player.chat('Point provided is invalid. Note: point id\'s start at 0.');
            }
        }

        callback(error, self);
    };

    self.reset = function(callback) {
        if("function" !== typeof callback) callback = function() {}; // callback should always be a function

        var error;

        if (_checkForInit()) {
            var time_start = utils.time();
            self.player.chat('Reset started.');

            __renderer.clearPaths( __path.getPaths(), function() { // clear old paths first
                __renderer.renderPoints( __map.getPoints(), function() {
                    var time_diff = (utils.time() - time_start) / 1000;
                    self.player.chat('Reset finished. ' + time_diff + ' seconds');
                });
            });
        }

        callback(error, self);
    };

    self.clear = function(callback) {
        if("function" !== typeof callback) callback = function() {}; // callback should always be a function

        var error;

        if (_checkForInit()) {
            var time_start = utils.time();
            self.player.chat('Clear started.');

            __renderer.clearPaths( __path.getPaths(), function() { // clear old paths first
                __renderer.clearPoints( __map.getPoints(), function() {
                    var time_diff = (utils.time() - time_start) / 1000;
                    self.player.chat('Clear finished. ' + time_diff + ' seconds');
                });
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

                var total_distance  = 0;

                for (var p = 0; p < paths.length; p++) {
                    self.player.chat(paths[p].p1_index + ' (' + colors[paths[p].p1_index] + ') -> ' + paths[p].p2_index + ' (' + colors[paths[p].p2_index] + ') = ' + paths[p].distance + ' blocks');
                    total_distance += paths[p].distance;
                }

                self.player.chat('Total Distance: ' + total_distance);

                break;
            default:
                self.player.chat(state + ' not found');
        }
    };

    self.empty = function(callback) {
        if("function" !== typeof callback) callback = function() {}; // callback should always be a function

        var error;

        if (_checkForInit()) {
            var time_start = utils.time();
            self.player.chat('Empty started.');

            __renderer.renderMap( __map.getFlatMap(), true, function() {
                var time_diff = (utils.time() - time_start) / 1000;
                self.player.chat('Empty finished. ' + time_diff + ' seconds');
            });

            __init_ran = false;
        }

        callback(error, self);
    };

    _initialize();

    return self;
};

module.exports = TravelingSalesman;
