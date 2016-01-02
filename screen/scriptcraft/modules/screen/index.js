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

    self.test = function() {
        var clrs = ['red','green','blue'];
        var ci   = 0;

        for (var cnt = 0; cnt < 3; cnt++) {
            for (var p = 0; p < pixels.length; p++) {
                self.pixelAt(p).setColor(clrs[ci]);
            }
            ci += 1;
            ci = ci >= clrs.length ? 0 : ci;
        }
    };

    // TODO:
    // - build a delete screen function (sets pixels to air - need a delete function for the pixel to do this)
    // - build a way to choose if we are using x or z as the facing
    // - build a way to access each pixel by index or by x/y coords

    function init() {
        for (var h = 0; h < height; h++) {
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
