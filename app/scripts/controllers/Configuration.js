'use strict';

angular.module('homepiApp')
  .controller('ConfigurationCtrl', ['$scope', '$routeParams', 'Device',
  function($scope, $routeParams, Device) {

    $scope.devices = Device.query();

  }]);