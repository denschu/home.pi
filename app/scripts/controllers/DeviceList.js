'use strict';

angular.module('homePiApp').controller('DeviceListCtrl', function ($scope, $http, Device) {

	$scope.devices = $http.get('/api/devices').
	    success(function(data) {
	      console.log('Returning Devices' + JSON.stringify(data));
	      $scope.devices = data;
	    });

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