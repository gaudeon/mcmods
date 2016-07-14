var Map      = require('traveling_salesman/map'),
    Path     = require('traveling_salesman/path'),
    Renderer = require('traveling_salesman/renderer');

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

    var __map, __path, __renderer;;

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

    self.init = function(callback) {
        if("function" !== typeof callback) callback = function() {}; // callback should always be a function

        var error;

        if (__init_ran) {
            self.clear(); // clear out map if we are running init again
        }

        new Map(sender, function(error, theMap) {
            if (! error) {
                __map = theMap;

                new Path(sender, function(error, thePath) {
                    if (! error) {
                        __path = thePath;

                        new Renderer(sender, function(error, theRenderer) {
                            if (! error) {
                                __renderer = theRenderer;

                                __init_ran = true;

                                self.player.chat('Map creation started.');

                                __renderer.renderMap( __map.getFlatMap(), undefined, function() {
                                    self.player.chat('Map creation finished.');
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

    _initialize();

    return self;
};

module.exports = TravelingSalesman;
