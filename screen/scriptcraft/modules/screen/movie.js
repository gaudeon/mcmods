/*
 * Movie
 *
 * Parameters:
 */
var Movie = function () {
    var self     = {};
    self.errors  = [];
    var frames   = [];

    // validation and error handling
    self.error = function(msg) {
        self.errors.push(msg);
        console.error('modules/movie - ' + msg);
    };

    if (self.errors.length > 0) {
        return self;
    }

    self.addFrame = function(frame) {
        if ("undefined" === typeof frame || "undefined" === typeof frame.typeof || ! frame.typeof().match(/^(Frame)$/)) {
            self.error("Not a valid frame");
            return;
        }

        frames.push(frame);

        return frame;
    };

    self.getFrames = function() {
        return frames;
    };

    // needed by screen display
    self.typeof = function() { return 'Movie'; };

    return self;
};

module.exports = Movie;