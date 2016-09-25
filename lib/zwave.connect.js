var shared = require('./zwave.shared.js');
var ZWave = require('openzwave-shared');
var zwave = new ZWave();
shared.zwave = zwave;

module.exports = function connect() {

    return gladys.param.getValue(shared.gladysUsbPortParam)
        .then((usbPort) => {

            var nodes = [];

            zwave.on('node added', function(nodeid) {
                nodes[nodeid] = {
                    manufacturer: '',
                    manufacturerid: '',
                    product: '',
                    producttype: '',
                    productid: '',
                    type: '',
                    name: '',
                    loc: '',
                    classes: {},
                    ready: false,
                };
            });

            zwave.on('value added', function(nodeid, comclass, value) {
                if (!nodes[nodeid]['classes'][comclass])
                    nodes[nodeid]['classes'][comclass] = {};
                nodes[nodeid]['classes'][comclass][value.index] = value;

                var state = {
                    value: value.value
                };

                gladys.deviceState.createByDeviceTypeIdentifier(generateIdentifier(nodeid, comclass, value.index), 'zwave', state)
                      .catch((err) => sails.log.warn(`Zwave Module : Fail to save deviceState : ${err}`));
            });

            zwave.on('value changed', function(nodeid, comclass, value) {
                if (nodes[nodeid]['ready']) {
                    console.log('node%d: changed: %d:%s:%s->%s', nodeid, comclass,
                            value['label'],
                            nodes[nodeid]['classes'][comclass][value.index]['value'],
                            value['value']);
                }
                nodes[nodeid]['classes'][comclass][value.index] = value;

                var state = {
                    value: value.value
                };

                gladys.deviceState.createByDeviceTypeIdentifier(generateIdentifier(nodeid, comclass, value.index), 'zwave', state)
                      .catch((err) => sails.log.warn(`Zwave Module : Fail to save deviceState : ${err}`));
            });

            zwave.on('value removed', function(nodeid, comclass, index) {
                if (nodes[nodeid]['classes'][comclass] &&
                    nodes[nodeid]['classes'][comclass][index])
                    delete nodes[nodeid]['classes'][comclass][index];
            });


            zwave.on('node ready', function(nodeid, nodeinfo) {
                nodes[nodeid]['manufacturer'] = nodeinfo.manufacturer;
                nodes[nodeid]['manufacturerid'] = nodeinfo.manufacturerid;
                nodes[nodeid]['product'] = nodeinfo.product;
                nodes[nodeid]['producttype'] = nodeinfo.producttype;
                nodes[nodeid]['productid'] = nodeinfo.productid;
                nodes[nodeid]['type'] = nodeinfo.type;
                nodes[nodeid]['name'] = nodeinfo.name;
                nodes[nodeid]['loc'] = nodeinfo.loc;
                nodes[nodeid]['ready'] = true;

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
                        var min = values[idx].min;
                        var max = values[idx].max;
                        
                        if (type == 'bool') {
                            type = 'binary';
                            min = 0;
                            max = 1;
                        }

                        newDevice.types.push({
                            type: type,
                            identifier: generateIdentifier(nodeid, comclass, values[idx].index),
                            sensor: values[idx].read_only,
                            unit: values[idx].units,
                            min: min,
                            max: max,
                            display: false
                        });

                    }
                }

                gladys.device.create(newDevice)
                    .catch((err) => sails.log.error(`Zwave module : Error while creating device : ${err}`));
            });


            zwave.connect(usbPort);
        });
}

function generateIdentifier(nodeid, comclass, index){
    return nodeid + shared.separator + comclass + shared.separator + index;
}