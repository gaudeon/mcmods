var screen = require('screen/screen');

var s;

// e.g. /jsp startstream 0 6 0 64 48 x
// note: width, height and orientation are optional, defaults are 64 48 x
command('startstream', function (params, player) {
    if("object" !== typeof s) {
        var x, y, z, width, height, orientation;

        if("undefined" === typeof params[0]) {
            echo(player, 'x is required');
            return;
        }
        x = new Number(params[0]);

        if("undefined" === typeof params[1]) {
            echo(player, 'y is required');
            return;
        }
        y = new Number(params[1]);

        if("undefined" === typeof params[2]) {
            echo(player, 'z is required');
            return;
        }
        z = new Number(params[2]);

        width       = ( "undefined" !== typeof params[3] ) ? new Number(params[3]) : 64;
        height      = ( "undefined" !== typeof params[4] ) ? new Number(params[4]) : 48; 
        orientation = ( "undefined" !== typeof params[5] && params[5].match(/^(x|z)$/) ) ? params[5] : 'x';

        new screen(x, y, z, width, height, orientation, player, function(theScreen) {
            s = theScreen;

            echo(player, 'screen created');

            s.displayFromStream('http://localhost:8080/', function() {
                echo(player, 'started streaming');
            });
        });
    }
}, ['x','y','z','width','height','orientation']);

command('stopstream', function (params, player) {
    if("undefined" !== typeof s) {
        s.hide();
        s = 0;
    }
});