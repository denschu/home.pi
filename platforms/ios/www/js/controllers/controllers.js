'use strict';

angular.module('homepi.controllers', ['homepi.config'])

.controller('AppCtrl', function($scope) {
  // Main app controller, empty for the example
})

.controller('DeviceListCtrl', function($scope, $rootScope, $firebaseSimpleLogin, $firebase, Socket, environment) {

  $scope.devices = {};

  $rootScope.auth.$getCurrentUser().then(function(user) {
      if(user){
        $scope.devices = $firebase(new Firebase(environment.firebase_url + '/users/' + $rootScope.auth.user.id + '/devices'));
        $scope.connect();
      }
    }, function(err) {
  });

  $scope.connect = function () {
      Socket.connect($scope.devices);
  };

  $scope.logout = function() {
    $rootScope.auth.$logout();
  };

  $scope.change = function (device) {
    console.log('changed: ' + device.id + ' value: ' + device.value);
    var payload = device.value;
    if(device.type == 'on_off' && (device.value == true || device.value == false)){
        payload = JSON.stringify(device.value);
    }
    Socket.publish(device.topic + '/set',payload);
  };

  Socket.onMessage(function(topic, payload) {
    console.log('incoming topic: ' + topic + ' and payload: ' + payload);
    angular.forEach($scope.devices, function(device) {
        //Search for corresponding device and update the value
        if(device.topic == topic){
          var isTrueSet = (payload === 'true');
          var isFalseSet = (payload === 'false');
          if(isTrueSet){
            device.value = true;
          }else if(isFalseSet){
            device.value = false;
          }else{
            device.value = payload;
          }
        }
    });
    $scope.$apply();
  });

})

.controller('LoginCtrl', function($scope, $rootScope, $ionicPopup, $firebaseSimpleLogin, environment) {
  $scope.loginData = {};

  $scope.showAlert = function() {
          $ionicPopup.alert({
            title: 'Error',
            content: 'User and/or password wrong!'
          }).then(function(res) {
            console.log('Alert showed...');
          });
        };

  $scope.tryLogin = function() {
    $rootScope.auth.$login('password', {email: $scope.loginData.email,password: $scope.loginData.password,rememberMe: true}).then(function(user) {
      // The root scope event will trigger and navigate
      console.info('Successfully logged in ' + user.id);
    }, function(error) {
      // Show a form error here
      console.error('Unable to login', error);
      $scope.showAlert();
    });
  };

  $scope.logout = function() {
    $rootScope.auth.$logout();
  };
})

.controller('SignupCtrl', function($scope) {
});
