'use strict';

angular.module('homePiApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/devices.html',
        controller: 'DeviceListCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });