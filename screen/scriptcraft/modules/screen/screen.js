var blocks = require('blocks'),
    pixel  = require('screen/pixel'),
    frame  = require('screen/frame'),
    event  = require('screen/event'),
    utils  = require('utils'),
    debug  = require('debug');

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
 *
 *  Valid resolutions:
 *      64  x 48
 *      128 x 96
 *      192 x 144
 *      256 x 192
 */
var Screen = function (x, y, z, width, height, orientation, sender, callback) {
    if("function" !== typeof callback) callback = function() {}; // initialize callback if needed

    var self          = {};
    self.errors       = [];
    self.pixels       = [];
    self.event        = new event();
    self.is_hidden    = true;

    // a completely black frame - setup in init
    self.emptyFrame   = new frame();

    // current displayed frame
    self.currentFrame = new frame();

    // state tracking if a frame is currently loading
    self.loadingFrame = false;

    // streaming options
    self.streamUrl    = '';
    self.isStreaming  = false;

    // minimum value that width/height is evenly divisble by
    var MINIMUM_MULTIPLE = height;

    // error handling
    self.error = function(msg) {
        self.errors.push(msg);
        console.error('modules/screen - ' + msg);
    };

    // stream something on the screen
    self.displayFromStream = function(url, callback) {
        if("function" !== typeof callback) callback = function() {};

        self.streamUrl = url;

        self.isStreaming = true;

        loadFrameFromStream(callback);
    };

    // used to recursively call for the next frame in stream
    function loadFrameFromStream(callback) {
        var url = self.streamUrl + (self.streamUrl.match(/\/$/) ? '' : '/') + width + '/' + height;

        if(! self.loadingFrame) {
            self.loadingFrame = true;

            new frame().loadFromHTTP(url, function(theFrame) {
                self.display(theFrame, function() {
                    self.loadingFrame = false;
                    callback(self);
                });
            }); 
        }

        if(self.isStreaming) {
            setTimeout(function() {
             loadFrameFromStream(callback);
            }, 100);
        }
    }

    // turn off streaming
    self.stopStream = function() {
        self.isStreaming = false;
    }

    // display something on the screen
    self.display = function(source, callback) {
        if ("undefined" === typeof source || "undefined" === typeof source.typeof || ! source.typeof().match(/^(Frame|Movie)$/)) {
            self.error("Cannot display source, invalid source");
            return;
        }

        switch(source.typeof()) {
            case 'Frame':
                displayFrame(source, callback);
                break;
            case 'Movie':
                displayMovie(source, callback);
                break;
        }
    };

    // display the screem
    self.show = function() {
        self.event.trigger('show');

        self.is_hidden = false;
    }

    // remove the screen
    self.hide = function() {
        self.stopStream();

        self.event.trigger('hide');

        self.is_hidden = true;
    };

    // is_hidden accessor
    self.isHidden = function() { return self.is_hidden; };

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
        if (index >= self.pixels.length) {
            index = self.pixels.length - 1;
        }

        return self.pixels[index];
    }
    
    // retrieve the current frame being displayed
    self.getCurrentFrame = function() {
        return self.currentFrame;
    }

    // set screen to empty frame
    self.clear = function() {
        self.stopStream();

        self.display(self.emptyFrame);
    }

    // get object typeof
    self.typeof = function() { return 'Screen'; };

    // NOTE: when changing pixel color delay your loops for at least 65 milliseconds (use utils.foreach)
    function displayMovie(movie, callback) {
        if ("function" !== typeof callback) {
            callback = function() {};
        }

        utils.foreach(movie.getFrames(), function(theFrame) {
            displayFrame(theFrame, callback)
        }, null, 65);
    }

    function displayFrame(frame, callback) {
        if ("function" !== typeof callback) callback = function() {};

        self.currentFrame = frame;

        var frameData = frame.frameData();

        self.event.trigger('display_frame', frameData);

        callback(self);
    }

    // initialize
    function initialize() {
        if ("undefined" === typeof x) {
            self.error('x is required and should be a number');
        }
    
        if ("undefined" === typeof y) {
            self.error('y is required and should be a number');
        }

        if ("undefined" === typeof z) {
            self.error('z is required and should be a number');
        }

        if ("undefined" === typeof width) {
            self.error('width is required and should be a number');
        }

        if(width % 16 != 0) {
            self.error('width must be evenly divisble by 16');
        }

        if ("undefined" === typeof height) {
            self.error('height is required and should be a number');
        }

        if(height % 16 != 0) {
            self.error('height must be evenly divisble by 16');
        }

        if(height / (width / 4) != 3) {
            self.error('width to height ratio must be 4:3');
        }

        if ("undefined" === typeof orientation || (! orientation.toString().match(/-?x/) && ! orientation.toString().match(/-?z/))) {
            orientation = 'x'; // default orientation to x
        }

        if ("undefined" === typeof sender || "undefined" === typeof sender.getServer) {
            self.error('sender is required');
        }
        else if ("undefined" === typeof sender.getServer) { // Make sure our sender is the correct kind of object
            self.error('sender is not valid');
        }

        if (self.errors.length > 0) {
            return self;
        }

        // generate a pixel creation function based on orientation so we don't run a switch statement for every pixel in the screen
        var new_pixel;

        switch (orientation) {
            case 'x':
                new_pixel = function(x, y, z, w, h, ind, sender) { return new pixel(x + w, y + h, z, ind, self, sender); };
                break;
            case '-x':
                new_pixel = function(x, y, z, w, h, ind, sender) { return new pixel(x - w, y + h, z, ind, self, sender); };
                break;
            case 'z':
                new_pixel = function(x, y, z, w, h, ind, sender) { return new pixel(x, y + h, z + w, ind, self, sender); };
                break;
            case '-z':
                new_pixel = function(x, y, z, w, h, ind, sender) { return new pixel(x, y + h, z - w, ind, self, sender); };
                break;
            default:
                new_pixel = function(x, y, z, w, h, ind, sender) { return new pixel(x + w, y + h, z, ind, self, sender); };
        }

        // default frame is setup as a black frame
        var default_frame_data = [];

        // as the screen is created the position (0,0) is the top left of the screen
        for (var h = height - 1; h >= 0; h--) {
            for (var w = 0; w < width; w++) {
                var ind = self.pixels.length;

                var p = new_pixel(x, y, z, w, h, ind, sender);

                self.pixels.push(p);

                default_frame_data.push(p.getColor());
            }
        }

        self.currentFrame = self.emptyFrame = new frame(default_frame_data);

        self.show();

        callback(self);
    }

    initialize();
    
    return self;
};

module.exports = Screen;
