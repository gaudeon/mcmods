var TravelingSalesman = require('traveling_salesman');

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
            ts.init();
            break;
        case 'path':
            ts.path(params[1], params[2])
            break;
        case 'reset':
            ts.reset();
            break;
        case 'clear':
            ts.clear();
            break;
    }
});
