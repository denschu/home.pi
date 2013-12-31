'use strict';

/* Services */

var homepiServices = angular.module('homepiServices', ['ngResource']);

homepiServices
  .factory('Device', ['$resource',
    function($resource){
      return $resource('api/devices/:deviceId', {deviceId:'@id'}, {
        query: {method:'GET', isArray:true}
      });
    }])
  .factory('DeviceState', ['$resource',
    function($resource){
      return $resource('api/devices/:deviceId/state', {deviceId:'@id'}, {
        update: {method:'PUT'}
      });
    }]);