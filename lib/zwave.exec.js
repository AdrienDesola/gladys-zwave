var shared = require('./zwave.shared.js');
var Promise = require('bluebird');

module.exports = function exec(options){
    if (!shared.zwave) return Promise.reject(new Error('Zwave instance not connected'));

    // separate identifier
    var arr = options.deviceType.deviceTypeIdentifier.split(shared.separator);

    sails.log.debug(`Zwave Module : Exec : node_id = ${arr[0]}, comclass=${arr[1]}, value = ${options.state.value}`);
    shared.zwave.setValue({node_id: parseInt(arr[0]), class_id: parseInt(arr[1]), instance:1, index:0}, options.state.value);

    // We return true because Zwave has a State feedback. 
    // So device Exec should not create deviceState
    return Promise.resolve(true);
};