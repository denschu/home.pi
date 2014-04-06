'use strict';

angular.module('homepi.controllers', ['homepi.config'])

.controller('AppCtrl', function($scope) {
  // Main app controller, empty for the example
})

.controller('DeviceListCtrl', function($scope, Socket, Device, environment) {

  $scope.devices = Device.query();

  var init = function () {
      console.log('init: ');
      Socket.connect($scope.devices);
  };
  init();

  $scope.change = function (device) {
    console.log('changed: ' + device.id + ' value: ' + device.value);
    var payload = device.value;
    if(device.type == 'on_off' && (device.value == true || device.value == false)){
        payload = JSON.stringify(!device.value);
    }
    Socket.publish(device.topic + '/set',payload);
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
