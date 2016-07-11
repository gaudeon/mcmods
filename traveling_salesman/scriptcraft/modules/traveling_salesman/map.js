/*
 * TravelingSalesmanMap
 *
 * Description: Generate virtual map to run traveling salesman experiment on
 *
 * Parameters:
 *  sender      - who is calling this
 *  callback    - callback called when initialization is complete
 */
var TravelingSalesmanMap = function (sender, callback) {
    if("function" !== typeof callback) callback = function() {}; // callback should always be a function

    var self = {};

    var __range = {
        x: 5,
        y: 5,
        z: 5
    };

    var __points_to_generate = 4;

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

            if (__map[x][y][z] === 1) {
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