module.exports = (function() {
    'use strict';

    var debug = function(obj,level,returnOutput) {
        if(!level) level = 0;
        var dumped_text = level == 0 ? "\n\n("+typeof(obj)+")\n--------------------------------\n" : "";

        //The padding given at the beginning of the line.
        var level_padding = "";
        for(var j=0;j<level+1;j++) level_padding += "    ";

        if(typeof(obj) == 'object') { //Array/Hashes/Objects
            for(var item in obj) {
                var value = obj[item];

                if(typeof(value) == 'object') { //If it is an array,
                    dumped_text += level_padding + "'" + item + "' ...\n";
                    dumped_text += debug(value,level+1,true);
                } else {
                    dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
                }
            }
        } else { //Stings/Chars/Numbers etc.
            dumped_text += obj + "\n";
        }

        // support inline debugging by returning the original object if we are not asked to return the debug output
        if ("undefined" === typeof returnOutput || ! returnOutput) {
            console.log(dumped_text);
            return obj;
        }

        return dumped_text;
    };

    return debug;
})();