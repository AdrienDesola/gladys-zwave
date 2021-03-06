

module.exports = function (sails) {

    var connect = require('./lib/zwave.connect.js');
    var disconnect = require('./lib/zwave.disconnect.js');
    var exec = require('./lib/zwave.exec.js');
    var setup = require('./lib/zwave.setup.js');
    var zwaveInstance = require('./lib/zwave.shared.js').zwave;

    gladys.on('ready', function(){
        connect();
    });

    return {
        connect,
        disconnect,
        exec,
        setup,
        zwaveInstance
    };
};