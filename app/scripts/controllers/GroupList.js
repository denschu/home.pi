'use strict';

angular.module('homePiApp').controller('GroupListCtrl', function ($scope, $http, Device) {

	$scope.groups = $http.get('/api/groups').
	    success(function(data) {
	      console.log('Returning Groups' + JSON.stringify(data));
	      $scope.devices = data;
	    });

});