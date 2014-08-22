'use strict';

// Declare app level module which depends on filters, and services
angular.module('homepi.config', [])

.constant('environment', {
  //'mqtt_host': 'localhost',
  'mqtt_host': '54.186.227.52',
  'mqtt_port': 8000
});
