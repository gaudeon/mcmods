/*
 * Frame
 *
 * Parameters:
 */
var Frame = function () {
    var self     = {};
    self.errors  = [];
    var frame    = [];

    if (self.errors.length > 0) {
        return self;
    }

    self.frameData = function() {
        return frame;
    };

    self.setFrameData = function(frame_array) {
        if ("object" === typeof frame_array) {
            frame = frame_array;
        }

        return frame;
    };

    self.loadFromFile = function(file_name) {
        var File    = java.io.File;
        var Scanner = java.io.Scanner;
        var content = '';

        var sc = new Scanner(new File(file_name));
        while(sc.hasNextLine()){
            content += sc.nextLine();
        }

        var new_array = eval(content);

        return self.setFrame(new_array);
    };

    // needed by screen disply
    self.typeof = function() { return 'Frame'; };

    return self;
};

module.exports = Frame;