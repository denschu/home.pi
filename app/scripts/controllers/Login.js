'use strict';

angular.module('homepiApp')
  .controller('LoginCtrl', function ($scope, $location, AuthenticationService) {    
    $scope.login = function() {
      AuthenticationService.login(this.credentials).success(function() {
        $location.path('/');
      });
    };
  });
