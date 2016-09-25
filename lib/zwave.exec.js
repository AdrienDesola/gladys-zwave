var shared = require('./zwave.shared.js');
var Promise = require('bluebird');

module.exports = function exec(options){
    if (!shared.zwave) return Promise.reject(new Error('Zwave instance not connected'));

    // separate identifier
    var arr = options.deviceType.identifier.split(shared.separator);

    shared.zwave.setValue({node_id: parseInt(arr[0]), class_id: parseInt(arr[1]), instance:1, index:0}, options.state.value);
};