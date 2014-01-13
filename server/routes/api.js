'use strict';

var mqtt = require('mqtt');
var fs = require('fs');
var url = require('url');

var configuration = JSON.parse(fs.readFileSync(__dirname+'/config.json').toString());

// Parse
var mqtt_url = url.parse(process.env.CLOUDMQTT_URL || 'mqtt://localhost:1883');
var auth = (mqtt_url.auth || ':').split(':');

//Creating the MQTT Client
console.log("Creating client for: " + mqtt_url.hostname);
var mqttClient = mqtt.createClient(mqtt_url.port, mqtt_url.hostname, {
  username: auth[0],
  password: auth[1]
});

mqttClient.on('connect', function() {
  for (var i=0;i<configuration.length;i++){ 
    var topic = configuration[i].topic;
    console.log("Subscribe to topic: " + topic);
    mqttClient.subscribe(topic);
  }
  mqttClient.on('message', function(topic, message) {
    topic = topic.replace(/"/g, "\\\"");
    var message = message.replace(/"/g, "\\\"");   
    console.log("Incoming message: " + message + ' for topic ' + topic);
    for (var i=0;i<configuration.length;i++){ 
      if(configuration[i].topic == topic){
        console.log('Change device state in GUI of device ' + configuration[i].id + ' to ' + message);
        configuration[i].state=message;
      }
    }
  });
});

// GET
exports.devices = function (req, res) {
  console.log('Getting devices: ' + configuration);
  res.json(configuration);
};

exports.device = function (req, res) {
  var id = req.params.id;
  console.log('Get device with id: ' + id);
  var device = null;
  for (var i=0;i<configuration.length;i++){ 
    if(configuration[i].id == id){
      device = configuration[i];
      console.log('Found device with id: ' + id);
    }
  }
  if (device != null) {
    res.json(device);
  } else {
    res.json(404);
  }
};

// POST
exports.addDevice = function (req, res) {
  var newdevice = req.body;
  console.log('Adding device: ' + JSON.stringify(newdevice));
  configuration.push(newdevice);
  res.send(201);
};

// PUT (idempotent changes)
exports.editDevice = function (req, res) {
  var id = req.params.id;
  if (id != null) {
    changeDeviceState(id, req.body.state);
    res.send(200);
  } else {
    res.json(404);
  }
};

// PUT
exports.editAllDevices = function (req, res) {
  console.log('Change status of all devices to ' + req.body.status);
  for (var i=0;i<configuration.length;i++){ 
    var id = configuration[i].id;
    changeDeviceState(id, req.body.state);
  }
  res.send(200);
};

// DELETE
exports.deleteDevice= function (req, res) {
  var id = req.params.id;
  if (id != null) {
    for (var i=0;i<configuration.length;i++){ 
      if(configuration[i].id == id){
        var device = configuration[i];
        console.log('Delete device with id: ' + id);
        configuration.splice(id, 1);
      }
    }
    res.send(200);
  } else {
    res.json(404);
  }
};

function changeDeviceState(id, state){
  for (var i=0;i<configuration.length;i++){ 
    if(configuration[i].id == id){
      var device = configuration[i];
      console.log('Change status of device with id ' + id + " to " + state);
      console.log('Publishing to Topic: '+ device.topic + '/set');
      mqttClient.publish(device.topic,state,{retain: true});
      device.state = state;
    }
  }
}