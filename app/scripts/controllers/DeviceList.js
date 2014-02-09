'use strict';

angular.module('homepi.controllers', ['firebase','homepi.config'])
.controller('DeviceListCtrl', function($scope, $firebase, Socket, environment) {

  $scope.$on('tab.shown', function() {
    var devices = new Firebase(environment.firebase_url + '/devices');
    devices.on('value', function(response) {
      $scope.devices = response.val();
      $scope.$apply();
      Socket.connect(response.val());
    });
  });
  $scope.$on('tab.hidden', function() {
    // Might recycle content here
  });

  $scope.change = function (device) {
    console.log('changed: ' + device.id + ' value: ' + device.value);
    Socket.publish(device.topic + '/set',device.value);
  };

  Socket.onMessage(function(topic, payload) {
    console.log('incoming topic: ' + topic + ' and payload: ' + payload);
    angular.forEach($scope.devices, function(device) {
        //Search for corresponding device and update the value
        if(device.topic == topic){
          var isTrueSet = (payload === 'true');
          var isFalseSet = (payload === 'false');
          if(isTrueSet){
            device.value = true;
          }else if(isFalseSet){
            device.value = false;
          }else{
            device.value = payload;
          }
        } 
    });
    $scope.$apply();
  });

});