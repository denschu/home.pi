# Home.Pi 
=============

*Home Automation with node.js, AngularJS and MQTT*

## Features

* Home Automation Bus based on MQTT
* Customizable
* Completely independent from the used technology (most bindings are written in node.js)
* Home.Pi is just a set of MQTT Topic Conventions 


## Setup 

	npm install or npm install --production
	grunt

# Setup MQTT Broker

	Mac: brew install mosquitto
	RPi: apt-get install mosquitto	
	RPi: sudo /etc/init.d/mosquitto (start/status/stop)

## Start 

Start the Broker

	mosquitto

Publish the configuration

	mosquitto_pub -d -r -t home/devices/light_1/config/name -m "Lamp 1"
	mosquitto_pub -d -r -t home/devices/light_1/config/type -m "on_off"

The following commands are examples from the mqtt-exec Binding and are not mandatory for running HomePi

	mosquitto_pub -d -r -t home/devices/light1/config/command/on  -m "echo turnOn"
	mosquitto_pub -d -r -t home/devices/light1/config/command/off  -m "echo turnOff"

Start HomePi

	/etc/init.d/homepi start 


HomePi will publish to the corresponding topics like the similar mosquitto_pub-command:

	mosquitto_pub -d -t /home/devices/light1/state/set -m "on"


## Run on bootup

	/opt/node/bin/npm install forever -g
	sudo update-rc.d homepi defaults
	sudo update-rc.d -f  homepi remove

## Check status of homepi

	forever list | grep app.js | wc -l | sed -e 's/1/App is running/' | sed -e 's/0/App not started/'


### Interfaces

* AngularJS
* Websocket (Socket.IO)
* REST-API

### MQTT Bindings (separate git-Repositories)

* Shell (Execute shell commands like "sudo shutdown -h now")
* Infrarot
* ELV Max! 
* WakeOnLAN (wol) 
* GPIO-PIN (RPi) 
* IFTT 
* REST

### MQTT topic conventions

home/devices/light1/state ON
home/devices/light1/state/set ON

home/devices/light_1/config/command/on
home/devices/light_1/config/command/toggle
home/devices/light_1/config/command/off

#### GUI Topics
home/devices/light_1/config/name "Lamp 1"

home/devices/light_1/config/type on_off
home/devices/light_1/config/type sensor

Get all devices: 			home/devices/+/config/name
Get all types:			 	home/devices/+/config/type
Get all possible commands: 	home/devices/+/config/command/+

#### Set State Topics

* /home/devices/*deviceName*/state/set
* Payload: command (ON,OFF,TOGGLE)

#### Get State Topics

* Topic: /home/devices/*deviceName*/state 
* *zone* = Room, all
* Payload: state (ON,OFF)

#### Device Configuration Topics

* Topic: e.g. /home/devices/*deviceName*/config/name 
* Payload: e.g. Name of the device

#### Device Event Topics

* Topic: /home/events/*eventName*
* Payload: ?


#### Group Topics

* /home/groups/*groupName*/state/set
* Payload: command (e.g. ALL_OFF)


### Configuration (planned)
* Show configuration
* Edit configuration

### Events (planned)
* React to a event from a device (Subscribe to topic based on MQTT)
* Send an event from a device


## REST API

[Documentation on apiary.io](http://apiary.io/home.pi)

### Get the list of active devices
	curl -i -X GET http://raspberrypi:8000/devices

### Turn device on
    curl -i -X PUT -H 'Content-Type: application/json' -d '{"state": "on"}' http://raspberrypi:8000/devices/0

### Turn device off
    curl -i -X PUT -H 'Content-Type: application/json' -d '{"state": "off"}' http://raspberrypi:8000/devices/0


# Technologies/Frameworks

## Platform
* node.js
* Express (HTTP/Web Server)

## Persistence
* InMemory

## GUI
* AngularJS
* KendoUI (planned)

## Development
* Grunt
* Karma
* SublimeText2

For further informations and setup instructions please refer to my [blog post](http://blog.codecentric.de/en/2013/03/home-automation-with-angularjs-and-node-js-on-a-raspberry-pi).