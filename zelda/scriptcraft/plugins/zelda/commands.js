var World = require('zelda/world');
var Drone = require('drone');

/*
 * Command: zelda
 */
command('zelda', function (params, player) {
    var w = new World(player);
});

// debug command to clear a large chunk of blocks
command('clear', function (params, player) {
    var size = params[0] || 20;

    var d = new Drone(player);

    d.box(0,size,size,size);
});