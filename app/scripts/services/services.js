angular.module('homepi.services', ['homepi.config','ngResource','firebase'])

.factory('Socket', function($firebase, environment) {

    var service = {};

    service.connect = function(devices) {

        var mqttbroker = new Firebase(environment.firebase_url + '/mqttbroker');
        mqttbroker.on('value', function(value) {
            if(service.ws) { return; }
            var ws = new Messaging.Client(value.val().host, value.val().port, "homepi");
            var options = {
                userName: value.val().username,
                password: value.val().password,
                onSuccess: function(value) {
                    console.log("Succeeded to open a connection to MQTT Broker...");
                    angular.forEach(devices, function(device) {
                      ws.subscribe(device.topic);
                    });
                  },
                onFailure: function(error) {
                    console.log('Could not connect to MQTT Broker: ' + error);
                }
            };
            ws.connect(options);
            ws.onMessageArrived = function(message) {
              service.callback(message.destinationName,message.payloadString);
            };
            service.ws = ws;
        });

    }

    service.publish = function(topic, payload) {
        var message = new Messaging.Message(payload);
        console.log('publish-Event sent '+ payload + ' with topic: ' + topic);
        message.destinationName = topic;
        message.qos = 0;
        message.retained=true;
        service.ws.send(message);
    }

    service.onMessage = function(callback) {
        service.callback = callback;
    }

    return service;
})
.factory('Device', function ($resource, environment) {
    return $resource(environment.firebase_url + '/devices.json', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});
