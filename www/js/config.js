'use strict';

// Declare app level module which depends on filters, and services
angular.module('homepi.config', [])

.constant('environment', {
  'mqtt_host': 'localhost',
  'mqtt_port': 8000
});
