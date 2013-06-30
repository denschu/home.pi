//execute commands
var util = require('util');
var sleep = require('sleep');
var mqtt = require('mqtt');
var io  = require('socket.io').listen(5000);

var preLoadedDevices = {};

// Create connection to MQTT Broker
var mqttClient = mqtt.createClient(1883,'localhost', function(err, client) {
    keepalive: 1000
});

// subscribe to MQTT configuration topics
console.log('Subscribing to configuration topics '+ 'home/devices/+/config/+');
mqttClient.subscribe('home/devices/+/config/#');

//MQTT Handling
mqttClient.on('message', function(topic, message) {
  console.log('received mqtt message with topic: ' + topic + ' and payload: ' + message);
  var splitTopic = topic.split("/");
  var deviceId = splitTopic[2];
  if(splitTopic[3] == "config"){
    if(preLoadedDevices[deviceId] == undefined){
      console.log("Creating new device with name: " + deviceId);
      var device = {id: deviceId, name: "", type: ""};
      preLoadedDevices[deviceId] = device;
    }
    if(splitTopic[4] == "name"){
      preLoadedDevices[deviceId].name = message;  
    }
    if(splitTopic[4] == "type"){
      console.log('Subscribing to configuration topics '+ 'home/devices/+/config/+');[deviceId].type = message;  
    }
  }
});

//Socket.IO Handling
io.sockets.on('connection', function (socket) {
  //socket.on('subscribe', function (message) {
  //  console.log('Subscribing to '+ message.topic);
  //  mqttClient.subscribe(message.topic);
  //});
  socket.on('mqtt', function (message) {
    console.log('Publishing to '+ message.topic);
    mqttClient.publish(message.topic,message.payload);
  });
});

// GET
exports.devices = function (req, res) {
  console.log('Getting devices...');
  var data = new Array();
  for (var key in preLoadedDevices) {
    data.push(preLoadedDevices[key]);
  }
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