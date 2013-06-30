'use strict';

angular.module('homePiApp').controller('DeviceListCtrl', function ($scope, Device, socket) {

	$scope.devices = Device.query();

	$scope.turnDeviceOn = function (id) {
		Device.turnOn(id);
	};

	$scope.turnDeviceOff = function (id) {
		Device.turnOff(id);
	};

	$scope.turnAllDevicesOn = function () {
		Device.turnAllDevicesOn();
	};

	$scope.turnAllDevicesOff = function () {
		Device.turnAllDevicesOff();
	};

});