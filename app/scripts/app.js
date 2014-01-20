'use strict';

angular.module('homepi', ['ionic', 'ngRoute', 'ngAnimate', 'ngResource', 'homepi.services', 'homepi.controllers'])
.config(function ($compileProvider){
  // Needed for routing to work
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

.config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
    templateUrl: 'partials/devices.html',
    controller: 'AppCtrl'
  });
  $routeProvider.when('/devices/:deviceId', {
    templateUrl: 'partials/device.html',
    controller: 'DeviceCtrl'
  });
  $routeProvider.otherwise({
    redirectTo: '/'
  });

});

