module.exports = {
    zwave: null,
    gladysUsbPortParam: 'zwave_usb_port',
    separator : ';;',
    params: {
        logging: true, // enable logging to OZW_Log.txt
        consoleoutput: true, // copy logging to the console
        saveconfig: true,
    },
    ctrlState: {
        0: 'No command in progress',
        1: 'The command is starting',
        2: 'The command was cancelled',
        3: 'Command invocation had error(s) and was aborted',
        4: 'Controller is waiting for a user action',
        5: 'Controller command is on a sleep queue wait for device',
        6: 'The controller is communicating with the other device to carry out the command',
        7: 'The command has completed successfully',
        8: 'The command has failed',
        9: 'The controller thinks the node is OK',
        10: 'The controller thinks the node has failed',
    },
    ctrlError: {
        0: 'No error',
        1: 'ButtonNotFound',
        2: 'NodeNotFound',
        3: 'NotBridge',
        4: 'NotSUC',
        5: 'NotSecondary',
        6: 'NotPrimary',
        7: 'IsPrimary',
        8: 'NotFound',
        9: 'Busy',
        10: 'Failed',
        11: 'Disabled',
        12: 'Overflow',
    },
    notificationCodes: {
        0: 'message complete',
        1: 'timeout',
        2: 'nop',
        3: 'node awake',
        4: 'node sleep',
        5: 'node dead (Undead Undead Undead)',
        6: 'node alive',
    }
};