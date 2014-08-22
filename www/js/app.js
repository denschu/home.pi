// Ionic Starter App, v0.9.20

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('homepi', ['ionic', 'homepi.services', 'homepi.controllers','homepi.config'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('splash', {
      url: "/",
      templateUrl: "templates/splash.html"
    })
    .state('login', {
      url: "/login",
      templateUrl: "templates/login.html",
      controller: 'LoginCtrl'
    })
    // the pet tab has its own child nav-view and history
    .state('devices', {
      url: '/devices',
      templateUrl: 'templates/devices.html',
      controller: 'DeviceListCtrl'
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/devices');

})

.run(function($rootScope, $state, $window, Socket, environment) {
  console.log("Verifying User Session..." + $rootScope.user);
  if($rootScope.user == undefined){
    $state.go('login');
  }else{
    Socket.connect($rootScope.user,$rootScope.password);
    $state.go('devices');
  }

});
