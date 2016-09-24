
var shared = require('./zwave.shared.js');

module.exports = function addDevice() {
  if(!shared.zwave) return Promise.reject(new Error('Zwave instance not connected'));
  var zwave = shared.zwave;

	if (zwave.hasOwnProperty('beginControllerCommand')) {
      // using legacy mode (OpenZWave version < 1.3) - no security
      zwave.beginControllerCommand('AddDevice', true);
    } else {
      // using new security API
      // set this to 'true' for secure devices eg. door locks
      zwave.addNode(false);
    }
}