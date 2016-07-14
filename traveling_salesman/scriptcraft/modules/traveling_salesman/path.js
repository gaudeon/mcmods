/*
 * TravelingSalesmanPath
 *
 * Description: Contains routines to assist in calculating best path between two points on a given map
 *
 * Parameters:
 *  sender      - who is calling this
 *  callback    - callback called when initialization is complete
 */
var TravelingSalesmanPath = function (sender, callback) {
    if("function" !== typeof callback) callback = function() {}; // callback should always be a function

    var self = {};

    var __paths = [];

    function _initialize() {
        var error;

        self.player = sender;

        callback(error, self);
    }

    /*
    * addPath
    *
    * Description: add an established path between two points
    */
    self.addPath = function(point1_index, point2_index, map, callback) {
        if("function" !== typeof callback) callback = function() {}; // callback should always be a function
    }

    /*
    * bestPath
    *
    * Description: determine the best path, along available paths, between two points
    */
    self.bestPath = function(point1_index, point2_index, map, callback) {
        if("function" !== typeof callback) callback = function() {}; // callback should always be a function
    };

    _initialize();

    return self;
};

module.exports = TravelingSalesmanPath;
