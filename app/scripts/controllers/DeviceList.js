'use strict';

angular.module('homepi.controllers', [])

.controller('AppCtrl', function($scope) {
  // Main app controller, empty for the example
})

.controller('DeviceListCtrl', function($scope, Device, DeviceState) {

  $scope.devices = Device.query();  

  $scope.$on('tab.shown', function() {
    // Might do a load here
  });
  $scope.$on('tab.hidden', function() {
    // Might recycle content here
  });

  $scope.change = function (device) {
    console.log('changed: ' + device.id + ' value: ' + device.value);
    var $id = device.id;
    var $value = device.value;
    DeviceState.update({id:$id, value:$value});
  };

})

.controller('DeviceCtrl', function($scope, $routeParams, Device) {
  $scope.device = Device.get($routeParams.deviceId);
});
