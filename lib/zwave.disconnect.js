var shared = require('./zwave.shared.js');

module.exports = function disconnect(){

     return gladys.param.getValue(shared.gladysUsbPortParam)
        .then((usbPort) => {
            shared.zwave.disconnect(usbPort);
        });
};