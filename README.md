#TODOs

* Support different control types in the gui: number, dimmer, switch, colour
* heroku config:add NODE_ENV=production
* Sending retained messages


# Home.Pi 

*Simple Home Automation Solution with MQTT*

## Features

* Home Automation based on MQTT
* Customizable
* Completely independent from the used technology (most bindings are written in node.js)
* Cloud-based architecture (only the bindings are running locally)


## Setup 

	npm install or npm install --production
	grunt

Take a look at my [puppet manifests](https://github.com/denschu/homepi-puppet) to setup Home.Pi on a Raspberry Pi very easily.

### Setup MQTT Broker

#### Mac

	brew install mosquitto

#### Raspberry Pi

	apt-get install mosquitto	
	sudo /etc/init.d/mosquitto (start/status/stop)

## Start 

### Start the Broker

	mosquitto

### Publish the configuration

	mosquitto_pub -d -r -t home/devices/light_1/config/name -m "Lamp 1"
	mosquitto_pub -d -r -t home/devices/light_1/config/type -m "on_off"

The following commands are examples from the mqtt-exec Binding and are not mandatory for running HomePi

	mosquitto_pub -d -r -t home/devices/light1/config/command/on  -m "echo turnOn"
	mosquitto_pub -d -r -t home/devices/light1/config/command/off  -m "echo turnOff"

### Start HomePi

	/etc/init.d/homepi start 

	mosquitto_sub -t home/devices/#


HomePi will publish to the corresponding topics like the similar mosquitto_pub-command:

	mosquitto_pub -d -t /home/devices/light1/state/set -m "on"


### Run on bootup

	/opt/node/bin/npm install forever -g
	sudo update-rc.d homepi defaults
	sudo update-rc.d -f  homepi remove

### Check status of homepi

	forever list | grep server.js | wc -l | sed -e 's/1/App is running/' | sed -e 's/0/App not started/'


## Interfaces

* AngularJS
* Websocket (Socket.IO)
* REST-API

## MQTT Bindings (separate git-Repositories)

* [mqtt-exec](https://github.com/denschu/mqtt-exec) (Execute shell commands like "sudo shutdown -h now")
* [mqtt-lirc](https://github.com/denschu/mqtt-lirc)
* ELV Max! 
* WakeOnLAN (wol) 
* GPIO-PIN (RPi) 
* IFTT 
* REST

## MQTT topics 

### Naming Conventions

	home/devices/light1/state ON
	home/devices/light1/state/set ON

### Device Topics

#### Set State 

* /home/devices/<deviceName>/state/set
* Payload: command (ON,OFF,TOGGLE)

#### Get State

* Topic: /home/devices/<deviceName>/state 
* Payload: state (ON,OFF)

## Technologies/Frameworks

### Platform
* node.js
* Express (HTTP/Web Server)
* MQTT

### Persistence
* InMemory

### GUI
* AngularJS

### Development
* Grunt
* Karma
* SublimeText2

## Planned Features

* Show/Edit configuration of a device
* React to a event from a device (Subscribe to topic based on MQTT)
* Send an event from a device
* Integration with [Node-RED](http://nodered.org/)
* Mobile GUI with KendoUI
* Add more Bindings
* ... make a feature request!

For further informations and setup instructions please refer to my [blog post](http://blog.codecentric.de/en/2013/03/home-automation-with-angularjs-and-node-js-on-a-raspberry-pi).