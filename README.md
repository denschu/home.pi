# Home.Pi

[![Build Status](https://travis-ci.org/denschu/home.pi.png)](https://travis-ci.org/denschu/home.pi)

* Simple Home Automation Solution with MQTT

## Facts

* Home Automation with MQTT
* Cloud-based Micro Service Architecture (only the bindings to control the devices are running locally)
* Completely independent from the used technology (most bindings are actually written in node.js)

## System Architecture

![System Architecture](sys_arch_homepi.jpg)

## Installation

* Install a MQTT Broker with Websocket Support, e.g.

	* [HiveMQ](http://www.hivemq.com/)
	* [Mosquitto](http://mosquitto.org/) with [https://github.com/stylpen/WSS]
	* [Mosca](http://www.mosca.io/)

* Clone the repository and install the dependencies with NPM

	git clone https://github.com/denschu/homepi
	npm install

* Publish your configuration to MQTT with the topic "/home/config" (see publish-config.sh)

Example configuration:

	{
	    "type" : "on_off",
	    "value" : false,
	    "name" : "Ceiling Light",
	    "topic" : "/home/devices/livingroom/ceiling_light/value",
	    "id" : "ceiling_light"
  	}

* Run with local HTTP Server

Open app/js/config.js and modify the MQTT URL.

	cd www
	python -m SimpleHTTPServer 8080
	mosca --http-port 8000 --http-bundle --verbose | bunyan

* Run with Docker

	docker run -p 1883:1883 -p 8000:8000 -v /var/db/mosca:/db denschu/mosca-secure
	docker run -d -p 80:80 denschu/homepi

Build and Run it as native app

	sudo npm install -g cordova ionic
	ionic platform add ios
	ionic build ios
	ionic emulate ios

## MQTT topic conventions

Subscribe to a topic for getting the value of a device

	/home/devices/<room>/<device-name>/state
	/home/devices/living_room/light1/state

Publish to a topic for setting the value of a device

	/home/devices/<room>/<device-name>/state/set <value>
	/home/devices/living_room/light1/state/set true

## Available MQTT Bindings (separate git-Repositories)

Take a look at my [puppet manifests](https://github.com/denschu/homepi-puppet) to setup the Raspberry Pi very easily with puppet. You also get some help for the manual setup.

At the moment the following "experimental" MQTT bindings are available:

* [mqtt-exec](https://npmjs.org/package/mqtt-exec) Execute shell commands like "sudo shutdown -h now"
* [mqtt-zway](https://npmjs.org/package/mqtt-zway) Connect to the Z-Wave RaZBerry Server Z-Way
* [mqtt-google-calendar](https://npmjs.org/package/mqtt-google-calendar) Use Google Calendar as a scheduling engine
* [mqtt-rules](https://github.com/denschu/mqtt-rules) Create rules and execute them on incoming MQTT messages
* [mqtt-temperature](https://github.com/denschu/mqtt-temperature) Log temperature to MQTT
* [mqtt-lirc](https://github.com/denschu/mqtt-lirc) Control infrared devices

## Technologies/Frameworks

* node.js
* MQTT
* Ionic Framework (with AngularJS)

For further informations and setup instructions please refer to my [blog posts](http://blog.codecentric.de/en/).
