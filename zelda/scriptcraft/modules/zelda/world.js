/*
 * World
 *
 * Parameters:
 *  sender      - who is calling this
 *  callback    - callback called when initialization is complete
 */
var World = function (sender, callback) {
    if("function" !== typeof callback) callback = function() {}; // callback should always be a function

    var self = {};

    function initialize() {
        var error;
       
        callback(error, self);
    }

    initialize();

    return self;
};

module.exports = World;