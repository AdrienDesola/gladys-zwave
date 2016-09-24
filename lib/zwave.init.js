var shared = require('./zwave.shared.js');
var ZWave = require('openzwave-shared');
var zwave = new ZWave();
shared.zwave = zwave;

module.exports = function init() {

    return gladys.param.getValue(shared.gladysUsbPortParam)
        .then((usbPort) => {

            zwave.on('value added', function(nodeid, comclass, value) {

            });

            zwave.on('value changed', function(nodeid, comclass, value) {

            });

            zwave.on('node ready', function(nodeid, nodeinfo) {
                var newDevice = {
                    device: {
                        name: `${nodeinfo.name} ${nodeinfo.type}`,
                        protocol: 'zwave',
                        service: 'zwave',
                        identifier: nodeid
                    },
                    types: []
                };

                for (comclass in nodes[nodeid]['classes']) {
                    switch (comclass) {
                        case 0x25: // COMMAND_CLASS_SWITCH_BINARY
                        case 0x26: // COMMAND_CLASS_SWITCH_MULTILEVEL
                            zwave.enablePoll(nodeid, comclass);
                            break;
                    }

                    var values = nodes[nodeid]['classes'][comclass];
                    for (idx in values) {
                        var type = values[idx].type;
                        if (type == 'bool') type = 'binary';

                        newDevice.types.push({
                            type: type,
                            identifier: comclass,
                            sensor: values[idx].read_only,
                            unit: values[idx].units,
                            min: values[idx].min,
                            max: values[idx].max,
                            display: false
                        });

                    }
                }

                gladys.device.create(newDevice)
                    .catch((err) => sails.log.error(`Zwave module : Error while creating device : ${err}`));
            });




        });
}