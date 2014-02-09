angular.module('homepi.services', ['firebase','homepi.config'])

.factory('Socket', function($rootScope, $firebase, environment) {

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
        var strLoc = JSON.stringify(payload);
        var message = new Messaging.Message(strLoc);
        console.log('publish-Event sent '+ strLoc + ' with topic: ' + topic);
        message.destinationName = topic;
        message.qos = 0;
        message.retained=true;
        service.ws.send(message);
    }

    service.onMessage = function(callback) {
        service.callback = callback;
    }
    
    return service;
});