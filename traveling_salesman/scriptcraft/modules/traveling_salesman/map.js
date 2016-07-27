var config = require('traveling_salesman/config'),
    utils  = require('traveling_salesman/utils');

/*
 * TravelingSalesmanMap
 *
 * Description: Generate virtual map to run traveling salesman experiment on
 *
 * Parameters:
 *  sender      - who is calling this
 *  callback    - callback called when initialization is complete
 */
var TravelingSalesmanMap = function (points, map_size, sender, callback) {
    if("function" !== typeof callback) callback = function() {}; // callback should always be a function

    var self = {};

    var __range = {
        x: map_size,
        y: map_size,
        z: map_size
    };

    var __points_to_generate = points;

    var __map;
    var __map_flat;
    var __points;

    function _initialize() {
        var error;

        _buildMap();

        _generatePoints();

        callback(error, self);
    }

    function _buildMap() {
        __map = [];

        for (var x = 0; x < __range.x; x++) {
            __map[x] = [];

            for (var y = 0; y < __range.y; y++) {
                __map[x][y] = [];

                for (var z = 0; z < __range.z; z++) {
                    __map[x][y][z] = 0;
                }
            }
        }
    }

    function _generatePoints() {
        var num_points_generated = 0;

        __points = [];

        while (num_points_generated < __points_to_generate) {
            var x = _getRandomInt(0, __range.x);
            var y = _getRandomInt(0, __range.y);
            var z = _getRandomInt(0, __range.z);

            if (! _isValidPoint(x,y,z)) {
                continue;
            }

            var point = num_points_generated + 1;

            __map[x][y][z] = point;

            __points.push({
                "x": x,
                "y": y,
                "z": z,
                "point": point
            });

            num_points_generated++;
        }
    }

    function _getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function _isValidPoint(x,y,z) {
        if (__map[x][y][z] === 1) {
            return false;
        }

        // points have to be a certain distance apart
        for (var p = 0; p < __points.length; p++) {
            if (utils.distance(x,y,z,__points[p].x,__points[p].y,__points[p].z) < Math.ceil(config.minimum_map_size / 2) + 1) {
                return false;
            }
        }

        return true;
    }

    // accessors for generated data
    self.getMap = function () { return __map; };

    self.getFlatMap = function () {
        if ("undefined" !== typeof __map_flat)
            return __map_flat;

        __map_flat = [];

        for (var x = 0; x < __range.x; x++) {
            for (var y = 0; y < __range.y; y++) {
                for (var z = 0; z < __range.z; z++) {
                    __map_flat.push({
                        "x": x,
                        "y": y,
                        "z": z,
                        "point": __map[x][y][z]
                    });
                }
            }
        }

        return __map_flat;
    }

    self.getPoints = function () { return __points; };

    self.getNumPointsGenerated = function () { return __points_to_generate; };

    self.getRange = function () { return __range; };

    // call constructor
    _initialize();

    return self;
};

module.exports = TravelingSalesmanMap;