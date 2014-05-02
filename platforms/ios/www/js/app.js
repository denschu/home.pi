// Ionic Starter App, v0.9.20

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('homepi', ['ionic', 'homepi.services', 'homepi.controllers','homepi.config'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
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
    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: 'SignupCtrl'
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

.run(function($rootScope, $firebaseSimpleLogin, $state, $window, environment) {

  var dataRef = new Firebase(environment.firebase_url);
  $rootScope.auth = $firebaseSimpleLogin(dataRef);

  $rootScope.auth.$getCurrentUser().then(function(user) {
    console.log("Verifying User Session..." + JSON.stringify(user));
    if(!user){
      // Might already be handled by logout event below
      $state.go('login');
    }
  }, function(err) {
  });

  $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
    $state.go('devices');
  });

  $rootScope.$on('$firebaseSimpleLogin:logout', function(e, user) {
    $state.go('login');
  });
});
