var config = require('zelda/config'),
    Drone  = require('drone');

/*
 * Room
 *
 * Parameters:
 *  sender      - who is calling this
 *  callback    - callback called when initialization is complete
 */
var Room = function (id, sender, callback) {
    if("function" !== typeof callback) callback = function() {}; // callback should always be a function

    var self = {};

    self.render = function(x,y,z) {
        var d = new Drone(sender);

        d.move(x,y,z,config.DRONE_FACING);

        d[self.id]();
    };

    function initialize() {
        if ("string" !== typeof id) {
            callback('room id is required', null);
        }

        self.id = id;

        self.data = require('zelda/room/' + id);

        callback(null, self);
    }

    initialize();

    return self;
};

module.exports = Room;