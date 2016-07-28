var blocks = require('blocks'),
    Drone  = require('drone'),
    utils  = require('utils');
/*
 * TravelingSalesmanRenderer
 *
 * Description: Uses the drone to manage a representation of the map in minecraft
 *
 * Parameters:
 *  sender      - who is calling this
 *  callback    - callback called when initialization is complete
 */
var TravelingSalesmanRenderer = function (sender, callback) {
    if("function" !== typeof callback) callback = function() {}; // callback should always be a function

    var self = {};

    var __drone = new Drone(sender);

    var __start_location = {
        x: 0,
        y: 0,
        z: 0
    };

    var __colors = ['white','orange','magenta','lightblue','yellow','lime','pink','gray','lightgray','cyan','purple','blue','brown','green','red','black'];

    function _initialize() {
        var error;

        __drone.up().up();

        __start_location = {
            x: __drone.x,
            y: __drone.y,
            z: __drone.z
        };

        self.player = sender;

        callback(error, self);
    }

    // map is a flat map containing json objects with keys x,y,z and point
    self.renderMap = function(map, empty, callback) {
        if("function" !== typeof callback) callback = function() {}; // callback should always be a function

        utils.foreach(map, function(loc) {
            __drone.x = __start_location.x + loc.x;
            __drone.y = __start_location.y + loc.y;
            __drone.z = __start_location.z + loc.z;

            if (loc.point && ! empty) {
                self.drawPoint(loc);
            }
            else {
                self.clearPoint(loc);
            }
        }, undefined, 4, function() { callback(undefined, self); });
    };

    self.clearMap = function(map, callback) {
        if("function" !== typeof callback) callback = function() {}; // callback should always be a function

        __drone.x = __start_location.x;
        __drone.y = __start_location.y;
        __drone.z = __start_location.z;

        var range = map.getRange();

        __drone.box(blocks.air, range.x, range.y, range.z);
        
        callback(undefined, self);
    };

    self.renderPoints = function(points, callback) {
        if("function" !== typeof callback) callback = function() {}; // callback should always be a function

        utils.foreach(points, function(point) {
            __drone.x = __start_location.x + point.x;
            __drone.y = __start_location.y + point.y;
            __drone.z = __start_location.z + point.z;

            self.drawPoint(point);
        }, undefined, 4, function() { callback(undefined, self); });
    }

    self.clearPoints = function(points, callback) {
        if("function" !== typeof callback) callback = function() {}; // callback should always be a function

        utils.foreach(points, function(point) {
            __drone.x = __start_location.x + point.x;
            __drone.y = __start_location.y + point.y;
            __drone.z = __start_location.z + point.z;

            self.clearPoint(point);
        }, undefined, 4, function() { callback(undefined, self); });
    }

    self.renderPaths = function(paths, callback) {
        if("function" !== typeof callback) callback = function() {}; // callback should always be a function

        utils.foreach(paths, function(path) {
            self.drawLine(path.p1, path.p2);
        }, undefined, 4, function() { callback(undefined, self); });
    }

    self.clearPaths = function(paths, callback) {
        if("function" !== typeof callback) callback = function() {}; // callback should always be a function

        utils.foreach(paths, function(path) {
            self.drawLine(path.p1, path.p2, blocks.air);
        }, undefined, 4, function() { callback(undefined, self); });
    }

    self.drawPoint = function(loc) {
        var color = loc.point % 16 == 0 ? 15 : loc.point % 16 - 1; // repeat colors

        __drone.box( blocks.wool[ __colors[color] ] );

        var block = self.player.world.getBlockAt( __drone.x, __drone.y, __drone.z );
        var state = block.getState();

        state.update();
    };

    self.clearPoint = function(loc) {
        __drone.box( blocks.air );

        var block = self.player.world.getBlockAt( __drone.x, __drone.y, __drone.z );
        var state = block.getState();

        state.update();
    };

    self.drawLine = function(point_1, point_2, block_type) {
        if ("undefined" === typeof block_type) {
            block_type = blocks.stained_glass[ 'white' ];
        }

        // determine direction on each axis
        var x_mod = point_1.x > point_2.x ? -1 : point_1.x < point_2.x ? 1 : 0;
        var y_mod = point_1.y > point_2.y ? -1 : point_1.y < point_2.y ? 1 : 0;
        var z_mod = point_1.z > point_2.z ? -1 : point_1.z < point_2.z ? 1 : 0;

        // determine distance on each axis
        var x_diff = Math.abs(point_1.x - point_2.x);
        var y_diff = Math.abs(point_1.y - point_2.y);
        var z_diff = Math.abs(point_1.z - point_2.z);

        // determine max distance of the three axis
        var max_diff = Math.max(x_diff, y_diff, z_diff);

        var points = [];

        for ( var i = 1; i < max_diff; i++) {
            var x = x_mod === 0 ? point_2.x : point_1.x + (i * x_mod);
            var y = y_mod === 0 ? point_2.y : point_1.y + (i * y_mod);
            var z = z_mod === 0 ? point_2.z : point_1.z + (i * z_mod);

            var point = {
                "x": x,
                "y": y,
                "z": z
            };

            points.push(point);

            // update modifiers each point so line corrects direction based on axis
            x_mod = x > point_2.x ? -1 : x < point_2.x ? 1 : 0;
            y_mod = y > point_2.y ? -1 : y < point_2.y ? 1 : 0;
            z_mod = z > point_2.z ? -1 : z < point_2.z ? 1 : 0;
        }

        // run through calculated points and draw them
        utils.foreach(points, function(point) {
            __drone.x = __start_location.x + point.x;
            __drone.y = __start_location.y + point.y;
            __drone.z = __start_location.z + point.z;

            self.drawLinePoint(block_type);
        }, undefined, 4);
    };

    self.drawLinePoint = function(block_type) {
        __drone.box( block_type );

        var block = self.player.world.getBlockAt( __drone.x, __drone.y, __drone.z );
        var state = block.getState();

        state.update();
    };

    self.getColors = function() { return __colors; };

    // call constructor
    _initialize();

    return self;
};

module.exports = TravelingSalesmanRenderer;