'use strict';

var mqtt = require('mqtt');
var fs = require('fs');
var url = require('url');
var Fiber = require('fibers');

var configuration = JSON.parse(fs.readFileSync(__dirname+'/config.json').toString());

// Parse
var mqtt_url = url.parse(process.env.MQTT_BROKER_URL || 'mqtt://localhost:1883');
var auth = (mqtt_url.auth || ':').split(':');

var bufferedRequests = {};

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
        console.log('Change device value in GUI of device ' + configuration[i].id + ' to ' + message);
        var isTrueSet = (message === 'true');
        var isFalseSet = (message === 'false');
        if(isTrueSet){
          configuration[i].value=isTrueSet;
        }else if(isFalseSet){
          configuration[i].value=isFalseSet;
        }else{
          configuration[i].value=message;
        }
      }
    }
  });
});

// GET
exports.devices = function (req, res) {
  console.log('Getting devices: ' + JSON.stringify(configuration));
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

// PUT (idempotent changes)
exports.editDevice = function (req, res) {
  var id = req.params.id;
  if (id != null) {
    changeDeviceState(id, req.body.value);
    res.send(200);
  } else {
    res.json(404);
  }
};

function changeDeviceState(id, value){
  for (var i=0;i<configuration.length;i++){ 
    if(configuration[i].id == id){
      var device = configuration[i];
      console.log('Change status of device with id ' + id + " to " + value);
      publishAsync(device.topic+ '/set',value.toString());
      //configuration[i].value = value;
    }
  }
}

function publishAsync(topic,payload) {
  bufferedRequests[topic] = payload;
  Fiber(function() {
      console.log('enqueue Message for topic: ' + topic + ' with payload: ' + payload);
      sleep(2000);
      if(bufferedRequests[topic] !=null){
        console.log('Publishing to topic: '+ topic + ' with payload: ' + bufferedRequests[topic]);
        mqttClient.publish(topic,bufferedRequests[topic],{retain: true});
        bufferedRequests[topic] = null;
      }
  }).run();
  console.log('back in main');
}

function sleep(ms) {
    var fiber = Fiber.current;
    setTimeout(function() {
        fiber.run();
    }, ms);
    Fiber.yield();
}