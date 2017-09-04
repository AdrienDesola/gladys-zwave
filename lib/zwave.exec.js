var shared = require('./zwave.shared.js');
var Promise = require('bluebird');

module.exports = function exec(options){
    if (!shared.zwave) return Promise.reject(new Error('Zwave instance not connected'));

    // separate identifier
    var arr = options.deviceType.deviceTypeIdentifier.split(shared.separator);

    sails.log.debug(`Zwave Module : id = ${options.deviceType.deviceTypeIdentifier}, name = ${options.deviceType.name}, value = ${options.state.value}`);
    shared.zwave.setValue(options.deviceType.deviceTypeIdentifier, options.state.value);

    // We return true because Zwave has a State feedback. 
    // So device Exec should not create deviceState
    return Promise.resolve(true);
};