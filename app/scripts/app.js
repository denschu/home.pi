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
      .when('/configuration', {
        templateUrl: 'partials/configuration',
        controller: 'ConfigurationCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });