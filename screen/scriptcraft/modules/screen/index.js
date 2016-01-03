var blocks = require('blocks'),
    pixel  = require('pixel');

/*
 * Screen
 *
 * Parameters:
 *  x           - x coordinate of bottom left corner block
 *  y           - y coordinate of bottom left corner block
 *  z           - z coordinate of bottom left corner block
 *  width       - screen width
 *  height      - screen height
 *  orientation - either along the 'x' or 'z' axis
 *  sender      - who is calling this
 */
var Screen = function (x, y, z, width, height, orientation, sender) {
    var self      = {};
    self.errors   = [];
    var pixels    = [];
    var is_hidden = true;

    self.error = function(msg) {
        self.errors.push(msg);
        console.error('modules/screen - ' + msg);
    };

    if ("number" !== typeof x) {
        self.error('x is required and should be a number');
    }

    if ("number" !== typeof y) {
        self.error('y is required and should be a number');
    }

    if ("number" !== typeof z) {
        self.error('z is required and should be a number');
    }

    if ("number" !== typeof width) {
        self.error('width is required and should be a number');
    }

    if ("number" !== typeof height) {
        self.error('height is required and should be a number');
    }

    if ("undefined" === typeof orientation || (! orientation.toString().match(/-?x/) && ! orientation.toString().match(/-?z/))) {
        orientation = 'x'; // default orientation to x
    }

    if ("undefined" === typeof sender) {
        self.error('sender is required');
    }

    if (self.errors.length > 0) {
        return self;
    }

    init();

    // display something on the screen
    self.display = function(source) {
        if ("undefined" === typeof source || "undefined" === typeof source.typeof || ! source.typeof().match(/^(Frame|Movie)$/)) {
            self.error("Cannot display source, invalid source");
            return;
        }

        switch(source.typeof()) {
            case 'Frame':
                var frame = source.frameData();
                for (var f = 0; f < frame.length; f++) {
                    self.pixelAt(f).setColor(frame[f]);
                }
                break;
        }
    };

    // display the screem
    self.show = function() {
        for (var i = 0; i < pixels.length; i++) {
            pixels[i].show();
        }

        is_hidden = false;
    }

    // remove the screen
    self.hide = function() {
        for (var i = 0; i < pixels.length; i++) {
            pixels[i].hide();
        }

        is_hidden = true;
    };

    // is_hidden accessor
    self.isHidden = function() { return is_hidden; };

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
        // generate a pixel creation function based on orientation so we don't run a switch statement for every pixel in the screen
        var new_pixel;

        switch (orientation) {
            case 'x':
                new_pixel = function(x, y, z, w, h, sender) { return new pixel(x + w, y + h, z, sender); };
                break;
            case '-x':
                new_pixel = function(x, y, z, w, h, sender) { return new pixel(x - w, y + h, z, sender); };
                break;
            case 'z':
                new_pixel = function(x, y, z, w, h, sender) { return new pixel(x, y + h, z + w, sender); };
                break;
            case '-z':
                new_pixel = function(x, y, z, w, h, sender) { return new pixel(x, y + h, z - w, sender); };
                break;
            default:
                new_pixel = function(x, y, z, w, h, sender) { return new pixel(x + w, y + h, z, sender); };
        }

        // as the screen is created the position (0,0) is the top left of the screen
        for (var h = height - 1; h >= 0; h--) {
            for (var w = 0; w < width; w++) {
                var p = new_pixel(x, y, z, w, h, sender);

                p.show();

                pixels.push(p);
            }
        }
    }

    return self;
};

module.exports = Screen;
