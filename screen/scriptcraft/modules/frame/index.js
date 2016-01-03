/*
 * Frame
 *
 * Parameters:
 *  width  - frame width
 *  height - frame height
 */
var Frame = function (width, height) {
    var self     = {};
    self.errors  = [];

    if ("number" !== typeof width) {
        self.error('width is required and should be a number');
    }

    if ("number" !== typeof height) {
        self.error('height is required and should be a number');
    }

    if (self.errors.length > 0) {
        return self;
    }

    return self;
};

module.exports = Frame;