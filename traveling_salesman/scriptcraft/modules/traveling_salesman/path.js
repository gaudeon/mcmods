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

    var __map, __paths;

    function _initialize(map) {
        var error;

        self.player = sender;

        __map = map;

        __paths = [];

        var points = __map.getPoints();

        var num_points = points.length;

        for (var src = 0; src < points.length; src++) {
            for (var dst = 0; dst < points.length; dst++) {
                if (src != dst && ! _pathExists(src, points[src], dst, points[dst]) && _pathCountForPoint(src) < Math.floor(num_points / 2) ) {
                    _addPath(src, points[src], dst, points[dst])
                }
            }
        }

        callback(error, self);
    }

    /*
    * _pathExists
    *
    * Description: Returns whether path exists or not
    */
    function _pathExists(p1_index, p1, p2_index, p2) {
        for (var p = 0; p < __paths.length; p++) {
            if (
                (__paths[p].p1_index == p1_index && __paths[p].p2_index == p2_index) ||
                (__paths[p].p1_index == p2_index && __paths[p].p2_index == p1_index)
            ) {
                return true;
            }
        }

        return false;
    }

    /*
    * _pathCountForPoint
    *
    * Description: Returns number of paths connected to a point
    */
    function _pathCountForPoint(p_index) {
        var count = 0;

        for (var p = 0; p < __paths.length; p++) {
            if (__paths[p].p1_index == p_index || __paths[p].p2_index == p_index) {
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
    function _addPath(p1_index, p1, p2_index, p2) {
        __paths.push({
            p1_index : p1_index,
            p1       : p1,
            p2_index : p2_index,
            p2       : p2
        });
    }

    /*
    * bestPath
    *
    * Description: determine the best path, along available paths, between two points
    */
    self.bestPath = function(point1_index, point2_index, callback) {
        if("function" !== typeof callback) callback = function() {}; // callback should always be a function
    };

    self.getPaths = function() { return __paths; }

    _initialize(map);

    return self;
};

module.exports = TravelingSalesmanPath;
