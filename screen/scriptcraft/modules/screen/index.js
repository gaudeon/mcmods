var blocks = require('blocks'),
    pixel  = require('pixel');

/*
 * Screen
 *
 * Parameters:
 *  x      - x coordinate of bottom left corner block
 *  y      - y coordinate of bottom left corner block
 *  z      - z coordinate of bottom left corner block
 *  width  - screen width
 *  height - screen height
 */
var Screen = function (x, y, z, width, height, sender) {
    var self = {};
    self.errors = [];
    var pixels = [];

    self.error = function(msg) {
        self.errors.push(msg);
        console.error('modules/screen - ' + msg);
    };

    if (typeof x !== "number") {
        self.error('x is required and should be a number');
    }

    if (typeof y !== "number") {
        self.error('y is required and should be a number');
    }

    if (typeof z !== "number") {
        self.error('z is required and should be a number');
    }

    if (typeof width !== "number") {
        self.error('width is required and should be a number');
    }

    if (typeof width !== "number") {
        self.error('width is required and should be a number');
    }

    if (self.errors.length > 0) {
        return self;
    }

    init();

    // TODO:
    // - build a delete screen function (sets pixels to air - need a delete function for the pixel to do this)
    // - build a way to choose if we are using x or z as the facing
    // - build a way to access each pixel by index or by x/y coords

    function init() {
        for (var w = 0; w < width; w++) {
            for (var h = 0; h < height; h++) {
                var p = new pixel(x + w, y + h, z, sender);

                p.render();

                pixels.push(p);
            }
        }
    }

    return self;
};

module.exports = Screen;
