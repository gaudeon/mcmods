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
        x: 10,
        y: 1,
        z: 10
    };

    var __points_to_generate = 10;

    var __map = [];

    function _initialize() {
        var error;

        _build_map();

        _generate_points();

        callback(error, self);
    }

    function _build_map() {
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

    function _generate_points() {
        var num_points_generated = 0;

        while (num_points_generated < __points_to_generate) {
            var x = _get_random_int(0, __range.x);
            var y = _get_random_int(0, __range.y);
            var z = _get_random_int(0, __range.z);

            if (__map[x][y][z] === 1) {
                continue;
            }

            __map[x][y][z] = 1;

            num_points_generated++;
        }
    }

    function _get_random_int(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    // accessors for generated data
    self.getMap = function() { return __map; };

    self.getNumPointsGenerated = function() { return __points_to_generate; };

    self.getRange = function() { return __range; };

    // call constructor
    _initialize();

    return self;
};

module.exports = TravelingSalesmanMap;