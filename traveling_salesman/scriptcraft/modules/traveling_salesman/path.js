var config = require('traveling_salesman/config'),
    utils  = require('traveling_salesman/utils');

/*
 * TravelingSalesmanPath
 *
 * Description: Contains routines to assist in calculating best path between two points on a given map
 *
 * Parameters:
 *  sender      - who is calling this
 *  callback    - callback called when initialization is complete
 */
var TravelingSalesmanPath = function (map, sender, callback) {
    if("function" !== typeof callback) callback = function() {}; // callback should always be a function

    var self = {};

    function _initialize(map) {
        var error;

        self.player = sender;

        self.map   = map;
        self.paths = [];

        callback(error, self);
    }

    /*
    * _pathCountForPoint
    *
    * Description: Returns number of paths connected to a point
    */
    function _pathCountForPoint(p_index) {
        var count = 0;

        for (var p = 0; p < self.paths.length; p++) {
            if (self.paths[p].p1_index == p_index || self.paths[p].p2_index == p_index) {
                count++;
            }
        }

        return count;
    }

    /*
    * _addPath
    *
    * Description: adds a new path
    */
    function _addPath(p1_index, p1, p2_index, p2, dist) {
        self.paths.push({
            p1_index : p1_index,
            p1       : p1,
            p2_index : p2_index,
            p2       : p2,
            distance : dist
        });
    }

    function _nearestNeighbor(point_index) {
        var points    = self.map.getPoints();
        var the_point = points[point_index];

        // starting distance is great then any other distance calculation could be
        var closest = { index: 0, distance: Math.pow(config.minimum_map_size, 3) + 1 };

        for (var p = 0; p < points.length; p++) {
            var dist = utils.distance(the_point.x, the_point.y, the_point.z, points[p].x, points[p].y, points[p].z);

            if (
                point_index != p &&
                dist < closest.distance &&
                _pathCountForPoint(p) == 0
            ) {
                closest = { index: p, distance: dist };
            }
        };

        _addPath(point_index, the_point, closest.index, points[closest.index], closest.distance);

        return closest.index;
    }

    /*
    * bestPath
    *
    * Description: determine the best path, along available paths, between two points
    */
    self.bestPath = function(starting_point, callback) {
        if("function" !== typeof callback) callback = function() {}; // callback should always be a function

        // reset paths
        self.paths = [];

        var points = self.map.getPoints();

        var num_points = points.length;

        var next_point = starting_point;

        for (var i = 0; i < num_points - 1; i++) {
            next_point = _nearestNeighbor(next_point);
        }

        callback(null, self.paths);

        return self.paths;
    };

    self.getPaths = function() { return self.paths; }

    _initialize(map);

    return self;
};

module.exports = TravelingSalesmanPath;
