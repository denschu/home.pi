'use strict';

/* Services */

var app = angular.module('homePiApp.services', ['ngResource']);

app.value('version', '1.0');

app.service('Switch', function($http) {

  this.query = function() {
  	console.log("Returning Switches");
	return $http.get("http://10.0.1.25:8000/switches").then(function (response) {
	    console.log(response);
	    return response.data;
	});
  };

  this.turnOn = function(id) {
  	console.log(id);
  	var status = '{"status": "1"}';
  	console.log(status);
  	return $http.put("http://10.0.1.25:8000/switches/" + id,status).then(function (response) {
	    console.log(response);
	    return response.data;
	});
  };

  this.turnOff = function(id) {
  	console.log(id);
  	var status = '{"status": "0"}';
  	console.log(status);
  	return $http.put("http://10.0.1.25:8000/switches/" + id,status).then(function (response) {
	    console.log(response);
	    return response.data;
	});
  };

});


app.factory('Switch2', function($resource){
  return $resource('http://10.0.1.25:8000/switches', 
  	{},//parameters 
  	{
    	query: {method:'GET', isArray:true, params: {}},
    	get: {method:'GET', params: {id: 0}}
  	});
});