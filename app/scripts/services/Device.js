'use strict';

var url = '/api/devices';
//var url = 'http://raspberrypi.local:8000/devices';

angular.module('homePiApp')
  .service('Device', function($http) {

  this.query = function() {
    console.log('Returning Devices');
    return $http.get(url).then(function (response) {
      console.log(response);
      return response.data;
    });
  };

  this.turnOn = function(id) {
    console.log(id);
    var request = '{"state": "on"}';
    console.log(request);
    return $http.put(url + '/' + id,request).then(function (response) {
      console.log(response);
      return response.data;
    });
  };

  this.turnOff = function(id) {
    console.log(id);
    var request = '{"state": "off"}';
    console.log(request);
    return $http.put(url + '/' + id,request).then(function (response) {
      console.log(response);
      return response.data;
    });
  };

  this.turnAllDevicesOn = function() {
    console.log('Turning on all devices');
    var request = '{"state": "on"}';
    console.log(request);
    return $http.put(url,request).then(function (response) {
      console.log(response);
      return response.data;
    });
  };

  this.turnAllDevicesOff = function() {
    console.log('Turning off all devices');
    var request = '{"state": "off"}';
    console.log(request);
    return $http.put(url,request).then(function (response) {
      console.log(response);
      return response.data;
    });
  };

});




