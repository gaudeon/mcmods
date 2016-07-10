var TravelingSalesman = require('traveling_salesman');
var Drone = require('drone');

/*
 * Command: traveling_salesman
 */
command('traveling_salesman', function (params, player) {
    var w = new TravelingSalesman(player);
});
