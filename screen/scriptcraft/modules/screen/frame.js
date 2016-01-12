/*
 * Frame
 *
 * Parameters:
 */
var Frame = function (data) {
    var self     = {};
    self.errors  = [];
    self.frame   = [];

    // validation and error handling
    self.error = function(msg) {
        self.errors.push(msg);
        console.error('modules/frame - ' + msg);
    };

    function init() {
        if ("undefined" !== typeof data) {
            self.setFrameData(data);
        }

        if (self.errors.length > 0) {
            return self;
        }
    }

    self.setFrameData = function(frame_array) {
        if ("object" === typeof frame_array && "undefined" !== typeof frame_array.push) {
            self.frame = frame_array;
        }
        else {
            self.error("Not a valid array");
        }

        return self.frame;
    };

    self.frameData = function() { return self.frame.slice(0) }; // return a clone of frame

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

    self.loadFromHTTP = function(url, callback) {
        var http = require('http/request');

        if("function" !== typeof callback) callback = function() {};

        http.request({
            url: url,
            method: 'GET',
            params: {}
        }, function (code, content) {
            if(code == 200) {
                var pixels = eval(content); // content should be an json array of wool color bin ids

                self.setFrameData(pixels);
                callback(self);
            }
            else {
                throw 'There was an error while attempting to connect to ' + url;
            }
        });
    };

    // needed by screen display
    self.typeof = function() { return 'Frame'; };

    init();

    return self;
};

module.exports = Frame;
