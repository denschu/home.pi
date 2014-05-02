angular.module('homepi.services', ['homepi.config','ngResource','firebase'])

.factory('Socket', function($rootScope, $firebase, environment) {

    var service = {};
    var client = {};

    service.connect = function(devices) {
        var mqttbroker = new Firebase(environment.firebase_url + '/users/' + $rootScope.auth.user.id + '/mqttbroker');
        mqttbroker.on('value', function(value) {
            client = mqtt.createClient(value.val().port,value.val().host);
            console.log("Succeeded to open a connection to MQTT Broker...");
            angular.forEach(devices, function(device) {
                if(device.topic != null){
                    console.log(device.topic);
                    client.subscribe(""+device.topic+""); 
                }
            });
            client.on('message', function (topic, message) {
              service.callback(topic,message);
            });
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
