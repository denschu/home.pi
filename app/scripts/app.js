'use strict';

angular.module('homepiApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'homepiServices'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/partials/devices.html',
        controller: 'DeviceListCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });