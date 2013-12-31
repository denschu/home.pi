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

    $scope.turnAllDevicesOn = function () {
		for (var i=0;i<$scope.devices.length;i++){ 
		    var $id = $scope.devices[i].id;
			var $state = 'on';
			DeviceState.update({id:$id, state:$state});
	    }
    };

    $scope.turnAllDevicesOff = function () {
		for (var i=0;i<$scope.devices.length;i++){ 
		    var $id = $scope.devices[i].id;
			var $state = 'off';
			DeviceState.update({id:$id, state:$state});
	    }
    };

});