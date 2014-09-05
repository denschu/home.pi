'use strict';

angular.module('homepi.controllers', [])

.controller('AppCtrl', function($scope) {
  // Main app controller, empty for the example
})

.controller('DeviceListCtrl', function($scope, $state, $rootScope, Socket) {

  $scope.devices = {};

  $scope.logout = function() {
    console.info('Successfully logged out ' + window.localStorage['user']);
    window.localStorage['host'] = undefined;
    window.localStorage['port'] = undefined;
    window.localStorage['user'] = undefined;
    window.localStorage['password'] = undefined;
    $state.go('login');
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

    var splitTopic = topic.split("/");
    if(splitTopic[2] == 'config'){
        console.log('Load device configuration from MQTT...' + payload);
        $scope.devices = JSON.parse(payload);
    }
    
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

.controller('LoginCtrl', function($state, $scope, $rootScope, $ionicPopup, Socket) {
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
    if($scope.loginData.user){
        console.info('Successfully logged in ' + $scope.loginData.user);
        window.localStorage['host'] = $scope.loginData.host;
        window.localStorage['port'] = $scope.loginData.port;
        window.localStorage['user'] = $scope.loginData.user;
        window.localStorage['password'] = $scope.loginData.password;
        Socket.connect($scope.loginData.host,$scope.loginData.port,$scope.loginData.user,$scope.loginData.password);
        $state.go('devices');
    }else{
        $scope.showAlert();
    }

  };

  $scope.logout = function() {
    console.info('Successfully logged out ' + window.localStorage['user']);
    window.localStorage['host'] = undefined;
    window.localStorage['port'] = undefined;
    window.localStorage['user'] = undefined;
    window.localStorage['password'] = undefined;
    $state.go('login');
  };
});
