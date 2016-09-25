var shared = require('./zwave.shared.js');
var addDevice = require('./zwave.addDevice.js');
var inclusionMode = false;

module.exports = function setup(){
    if(!inclusionMode){
        inclusionMode = true;
        return addDevice();
    } else {
        inclusionMode = false;
        shared.zwave.cancelControllerCommand();
    }
};