angular.module('homepi.services', ['homepi.config','ngResource'])

.factory('Socket', function($rootScope, environment) {

    var service = {};
    var client = {};

    service.connect = function(user, password) {
        var options = {
          username: user,
          password: password
        };
        client = mqtt.createClient(environment.mqtt_port,environment.mqtt_host,options);
        console.log("Try to connect to MQTT Broker " +environment.mqtt_host + " with user " + user);
        client.subscribe("/#"); 
        client.on('message', function (topic, message) {
          service.callback(topic,message);
        });
    }

    service.publish = function(topic, payload) {
        client.publish(topic,payload, {retain: true});
        console.log('publish-Event sent '+ payload + ' with topic: ' + topic + ' ' + client);
    }

    service.onMessage = function(callback) {
        service.callback = callback;
    }

    return service;
});
