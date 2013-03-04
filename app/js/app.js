'use strict';


// Declare app level module which depends on filters, and services
angular.module('homePiApp', ['homePiApp.filters', 'homePiApp.services', 'homePiApp.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/switches.html', controller: SwitchListCtrl});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);
