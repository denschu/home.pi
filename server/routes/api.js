//execute commands
var util = require('util');
var exec = require('child_process').exec;
var sleep = require('sleep');

//Shell Client
// homepi <id> <command>
// homepi 0 ON --> curl -i -X PUT -H 'Content-Type: application/json' -d '{"state": "on"}' http://raspberrypi:8080/devices/0

var data = [
    {
      "id": "stehlampe_wand",
      "name": "Stehlampe Wand",
      "gui_type": "on_off",
      "type": "shell",
      "state": "off",
      "group": "wohnzimmer",
      "commands": [
        { "name": "on", "command": "sudo /home/pi/rcswitch-pi/sendRev B 1 1" },
        { "name": "off", "command": "sudo /home/pi/rcswitch-pi/sendRev B 1 0" }
      ]
    },
    {
      "id": "stehlampe_couch",
      "name": "Stehlampe Couch",
      "gui_type": "on_off",
      "type": "shell",
      "state": "off",
      "group": "wohnzimmer",
      "commands": [
        { "name": "on", "command": "sudo /home/pi/rcswitch-pi/sendRev B 2 1" },
        { "name": "off", "command": "sudo /home/pi/rcswitch-pi/sendRev B 2 0" }
      ]
    },
    {
      "id": "lampe_gruen",
      "name": "Lampe grün",
      "gui_type": "on_off",
      "type": "shell",
      "state": "off",
      "group": "wohnzimmer_schrank",
      "commands": [
        { "name": "on", "command": "sudo /home/pi/rcswitch-pi/sendRev B 3 1" },
        { "name": "off", "command": "sudo /home/pi/rcswitch-pi/sendRev B 3 0" }
      ]
    }
    //{
    //  "id": 1,
    //  "name": "Apple TV",
    //  "gui_type": "send",
    //  "type": "shell",
    //  "state": null,
    //  "commands": [
    //    { "name": "power_on", "command": "irsend send_once apple_a1294 menu" }
    //  ]
    //}
  ];


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