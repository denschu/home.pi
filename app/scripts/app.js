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
        templateUrl: 'partials/devices',
        controller: 'DeviceListCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });