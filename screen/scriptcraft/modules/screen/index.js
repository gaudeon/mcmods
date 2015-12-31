var Screen = function() {
    'use strict';

    var self = {};

    self.test = function() {
        console.log(arguments);
    };

    return self;
};

module.exports = Screen;