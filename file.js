var  fs = require('fs');

var devices = JSON.parse(fs.readFileSync(__dirname+'/server/config/devices.json').toString());
        devices.forEach(function (device) { 
        	console.log('Device: ' + device.id);
        });
        console.log('Finised loading device configuration.');