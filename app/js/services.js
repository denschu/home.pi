'use strict';

/* Services */

var app = angular.module('homePiApp.services', ['ngResource']);

var url = "http://10.0.1.25:8000/switches";

app.value('version', '1.0');

app.service('Switch', function($http) {

  this.query = function() {
  	console.log("Returning Switches");
	  return $http.get(url).then(function (response) {
	    console.log(response);
	    return response.data;
	});
  };

  this.turnOn = function(id) {
  	console.log(id);
  	var request = '{"status": "1"}';
  	console.log(request);
  	return $http.put(url + "/" + id,request).then(function (response) {
	    console.log(response);
	    return response.data;
	});
  };

  this.turnOff = function(id) {
  	console.log(id);
  	var request = '{"status": "0"}';
  	console.log(request);
  	return $http.put(url + "/" + id,request).then(function (response) {
	    console.log(response);
	    return response.data;
	});
  };

});


app.factory('Switch2', function($resource){
  return $resource('http://10.0.1.25:port/switches', 
  	{port:':8000'},//parameters 
  	{
    	query: {method:'GET', isArray:true},
    	get: {method:'GET', params: {id: 0}}
  	});
});



