//execute commands
var util = require('util');
var exec = require('child_process').exec;
var sleep = require('sleep');
var fs = require('fs');

//Shell Client
// homepi <id> <command>
// homepi 0 ON 
//--> curl -i -X PUT -H 'Content-Type: application/json' -d '{"state": "on"}' http://raspberrypi:8080/devices/0
//--> mosquitto_pub -d -t home/world -m "on"

var data = JSON.parse(fs.readFileSync(__dirname+'/devices.json').toString());
        data.forEach(function (device) { 
          console.log('Loading Device: ' + device.id);
        });
        console.log('Finished loading device configuration.');

var groups = {
   wohnzimmer: "Wohnzimmer",
   wohnzimmer_schrank: "Schrank"
};

// GET
exports.devices = function (req, res) {
  console.log('Getting devices: ' + data);
  var devices = [];
  res.json(data);
};

exports.groups = function (req, res) {
  console.log('Getting groups: ' + data);
  var groups = [];
  for (var i=0;i<data.length;i++){ 
    groups.push(data[i].group);
  }
  res.json(groups);
};

exports.device = function (req, res) {
  var id = req.params.id;
  if (id >= 0 && id < data.length) {
    res.json(data[id]);
  } else {
    res.json(404);
  }
};

exports.group = function (req, res) {
  var group = req.params.group;
  console.log('Getting devices of group: ' + group);
  var devices_in_group = [];
  for (var i=0;i<data.length;i++){
    if(data[i].group == group){
      devices_in_group.push(data[i]);
    }
  }
  res.json(devices_in_group);
};

// POST
exports.addDevice = function (req, res) {
  var newdevice = req.body;
  console.log('Adding device: ' + JSON.stringify(newdevice));
  data.push(newdevice);
  res.send(201);
};

// PUT (idempotent changes)
exports.editDevice = function (req, res) {
  var id = req.params.id;
  console.log('id:' + id);
  if (id != null) {
    console.log('req.body.state:' + req.body.state);
    changeDeviceState(id, req.body.state);
    res.send(200);
  } else {
    res.json(404);
  }
};

// PUT
exports.editAllDevices = function (req, res) {
  console.log('Change status of all devices to ' + req.body.status);
  for (var i=0;i<data.length;i++){ 
    var id = data[i].id;
    changeDeviceState(id, req.body.state);
  }
  res.send(200);
};

// DELETE
exports.deleteDevice= function (req, res) {
  var id = req.params.id;
  if (id != null) {
    for (var i=0;i<data.length;i++){ 
      if(data[i].id == id){
        var device = data[i];
        console.log('Delete device with id: ' + id);
        data.splice(id, 1);
      }
    }
    res.send(200);
  } else {
    res.json(404);
  }
};

function changeDeviceState(id, state){
  for (var i=0;i<data.length;i++){ 
    if(data[i].id == id){
      var device = data[i];
      for (var j=0;j<device.commands.length;j++){ 
          if(device.commands[j].name == state){
            console.log('Change status of device with id ' + id + " to " + state);
            var command = device.commands[j].command;
            executeShellCommand(command);
            device.state = state;
          }
      }
    }
  }
}

function executeShellCommand(command){
    console.log("Executing command: " + command);
    //exec(command, puts);
    sleep.sleep(1);//sleep for 1 seconds
}

function puts(error, stdout, stderr) { 
        util.puts(stdout); 
        console.warn("Executing Done");
}