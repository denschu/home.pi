'use strict';

/* Controllers */


function SwitchListCtrl($scope, $http, Switch) {

  $scope.switches = Switch.query();

  //$scope.switches = $http.get("http://10.0.1.25:8000/switches").then(function (response) {
   //     console.log(response);
   //     return response.data;
   //   });

  //$http.get("http://10.0.1.25:8000/switches")
	//	.success(function(data, status, headers, config) {
	//	    $scope.switches = data;
	//	    console.log(data);
	//	});

  $scope.turnSwitchOn = function (id) {
    Switch.turnOn(id)
  };

  $scope.turnSwitchOff = function (id) {
    Switch.turnOff(id)
  };

}

//function SwitchListCtrl($scope, $http) {
//  $http.get('http://10.0.1.25:8000/switches').success(function(data) {
//    Console.log(data);
//    $scope.switches = data.switches;
//  });
//}
 
//PhoneListCtrl.$inject = ['$scope', '$http'];

//function Switches2Ctrl($scope, $http) {
//  $http.get('http://rcswitch.apiary.io/switches').
//    success(function(data, status, headers, config) {
//      $scope.switches = data.switches;
//    });

//  $scope.editSwitch = function () {
//    $http.put('http://rcswitch.apiary.io/switches/' + $routeParams.id, $scope.form).
//      success(function(data) {
//        $location.url('/');
//      });
//  };
//}


