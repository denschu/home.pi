//execute commands
var util = require('util');
var exec = require('child_process').exec;
var sleep = require('sleep');

//Shell Client
// homepi <id> <command>
// homepi 0 ON --> curl -i -X PUT -H 'Content-Type: application/json' -d '{"state": "on"}' http://raspberrypi:8080/devices/0

//groups
//schedules
//configuration

var data = [
    {
      "id": 0,
      "name": "Stehlampe Wand",
      "gui_type": "on_off",
      "type": "shell",
      "state": "off",
      "commands": [
        { "name": "on", "command": "sudo /home/pi/rcswitch-pi/sendRev B 1 1" },
        { "name": "off", "command": "sudo /home/pi/rcswitch-pi/sendRev B 1 0" }
      ]
    },
    {
      "id": 1,
      "name": "Stehlampe Couch",
      "gui_type": "on_off",
      "type": "shell",
      "state": "off",
      "commands": [
        { "name": "on", "command": "sudo /home/pi/rcswitch-pi/sendRev B 2 1" },
        { "name": "off", "command": "sudo /home/pi/rcswitch-pi/sendRev B 2 0" }
      ]
    },
    {
      "id": 2,
      "name": "Lampe grün",
      "gui_type": "on_off",
      "type": "shell",
      "state": "off",
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

// GET
exports.devices = function (req, res) {
  console.log('Getting devices.');
  var devices = [];
  res.json(data);
};

exports.device = function (req, res) {
  var id = req.params.id;
  if (id >= 0 && id < data.length) {
    res.json(data[id]);
  } else {
    res.json(404);
  }
};

// POST
exports.addDevice = function (req, res) {
  var newdevice = req.body;
  newdevice.id=data.length;
  newdevice.url="/devices/"+newdevice.id;
  newdevice.status="0";
  console.log('Adding device: ' + JSON.stringify(newdevice));
  data.push(newdevice);
  res.send(201);
};

// PUT (idempotent changes)
exports.editDevice = function (req, res) {
  var id = req.params.id;
  if (id >= 0 && id <= data.length) {
    console.log('req.body.state:' + req.body.state);
    console.log('data[id].commands[0]:' + data[id].commands[0].name);
    for (var i=0;i<data[id].commands.length;i++){ 
      if(data[id].commands[i].name == req.body.state){
        console.log('Change status of device with id ' + id + " to " + req.body.state);
        var command = data[id].commands[i].command;
        deviceStatus(command);
        data[id].state = req.body.state;
        res.send(200);
      }
    }
    res.send(200);
  } else {
    res.json(404);
  }
};

// PUT
exports.editAllDevices = function (req, res) {
  console.log('Change status of all devices to ' + req.body.status);
  for (var i=0;i<data.length;i++){ 
    var command = data[i].command;
    deviceStatus(command);
    data[i].status = req.body.state;
  }
  res.send(200);
};

// DELETE
exports.deleteDevice= function (req, res) {
  var id = req.params.id;
  if (id >= 0 && id < data.length) {
    console.log('Delete device with id: ' + id);
    data.splice(id, 1);
    res.send(200);
  } else {
    res.json(404);
  }
};


function deviceStatus(command){
    console.log("Executing command: " + command);
    exec(command, puts);
    sleep.sleep(1);//sleep for 1 seconds
}

function puts(error, stdout, stderr) { 
        util.puts(stdout); 
        console.warn("Executing Done");
}