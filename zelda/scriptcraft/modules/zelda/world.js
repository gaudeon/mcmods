var Room  = require('zelda/room'),
    rooms = require('zelda/rooms');

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

        self.rooms = {};

        for(var r = 0; r < rooms.length; r++) {
            var room = rooms[r];

            self.rooms[room.id] = new Room(room.id, sender, function(error, r) {
                r.render(room.location.x, room.location.y, room.location.z);
            });
        }

        callback(error, self);
    }

    initialize();

    return self;
};

module.exports = World;