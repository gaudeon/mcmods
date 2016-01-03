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

    // display the screem
    self.show = function() {
        for (var i = 0; i < pixels.length; i++) {
            pixels[i].show();
        }
    }

    // remove the screen
    self.hide = function() {
        for (var i = 0; i < pixels.length; i++) {
            pixels[i].hide();
        }
    };

    // get pixel at a location
    self.pixelAt = function(x, y) {
        var index;
        // if only x is passed treat it as an index value instead and calculate y
        if ("undefined" === typeof y) {
            index = x;
        }
        else {
           index = x + (y * width);
        }

        // Make sure we are in a valid range
        if (index < 0) {
            index = 0;
        }
        if (index >= pixels.length) {
            index = pixels.length - 1;
        }

        return pixels[index];
    }

    // NOTE: when changing pixel color delay your loops for at least 65 milliseconds (use utils.foreach)

    function init() {
        // as the screen is created the position (0,0) is the top left of the screen
        for (var h = height - 1; h >= 0; h--) {
            for (var w = 0; w < width; w++) {
                var p = new pixel(x + w, y + h, z, sender);

                p.show();

                pixels.push(p);
            }
        }
    }

    return self;
};

module.exports = Screen;
