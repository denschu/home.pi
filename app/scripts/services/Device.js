'use strict';

angular.module('homepi.services', ['ngResource'])
.factory('Device', ['$resource',
  function($resource){
    return $resource('api/devices/:deviceId', {deviceId:'@id'}, {
      query: {method:'GET', isArray:true}
    });
  }])
.factory('DeviceState', ['$resource',
  function($resource){
    return $resource('api/devices/:deviceId/value', {deviceId:'@id'}, {
      update: {method:'PUT'}
    });
  }]);