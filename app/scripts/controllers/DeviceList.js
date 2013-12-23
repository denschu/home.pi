'use strict';

angular.module('homepiApp')
  .controller('DeviceListCtrl', function ($scope, Device, DeviceState) {

	$scope.devices = Device.query();

	$scope.turnDeviceOn = function (id) {
		var $id = id;
		var $state = 'on';
		DeviceState.update({id:$id, state:$state});
	};

	$scope.turnDeviceOff = function (id) {
		var  $id = id;
		var $state = 'off';
		DeviceState.update({id:$id, state:$state});
	};

});