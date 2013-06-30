'use strict';

//var url = '/api/devices';
var url = '/api/devices';

angular.module('homePiApp').service('Device', function($http, socket) {

  this.query = function() {
    console.log('Returning Devices');
    return $http.get(url).then(function (response) {
      console.log(response);
      return response.data;
    });
  };

  this.turnOn = function(id) {
    console.log("TurnOn Id=" + id);
    var topicString = "home/devices/" + id + "/state/set";
    var data = { topic: topicString, payload: "on"};
    socket.emit('mqtt',data, null);
  };

  this.turnOff = function(id) {
    console.log("TurnOff Id=" + id);
    var topicString = "home/devices/" + id + "/state/set";
    var data = { topic: topicString, payload: "off"};
    socket.emit('mqtt',data, null);
  };

  this.turnAllDevicesOn = function() {
    console.log('Turning on all devices');
  };

  this.turnAllDevicesOff = function() {
    console.log('Turning off all devices');
  };

});




