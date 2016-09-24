

module.exports = function (sails) {

    var init = require('./lib/zwave.init.js');

    gladys.on('ready', function(){
        init();
    });
    
};