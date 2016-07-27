var TravelingSalesman = require('traveling_salesman'),
    config            = require('traveling_salesman/config');

/*
 * Command: traveling_salesman
 */
var ts;

command('ts', function (params, player) {
    // Must be a player to run these commands
    if("undefined" === typeof player.getLocation) {
        console.log('This command must be ran by an actual player');
        return;
    }

    if ("undefined" === typeof ts) {
        ts = new TravelingSalesman(player);
    }

    switch (params[0]) {
        case 'init':
            var points   = params[1] ? params[1] * 1 : config.minimum_points;
            var map_size = params[2] ? params[2] * 1 : config.minimum_map_size;

            if ( points < config.minimum_points ) {
                points = config.minimum_points;
            }

            if ( map_size < config.minimum_map_size ) {
                map_size = config.minimum_map_size;
            }

            ts.init(points, map_size);

            break;
        case 'path':
            var point_1 = params[1];
            var point_2 = params[2];

            ts.path(point_1, point_2);

            break;
        case 'reset':
            ts.reset();

            break;
        case 'clear':
            ts.clear();

            break;

        case 'print':
            ts.print(params[1]);

            break;
    }
});
