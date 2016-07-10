var TravelingSalesman = require('traveling_salesman');

/*
 * Command: traveling_salesman
 */
command('traveling_salesman', function (params, player) {
    var w = new TravelingSalesman(player);
});
