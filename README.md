#TODOs

* Support different control types in the gui: number, dimmer, switch (subtypes: light_switch, tv_switch), colour


# Home.Pi 

*Simple Home Automation Solution with MQTT*

## Features

* Home Automation based on MQTT
* Customizable
* Completely independent from the used technology (most bindings are written in node.js)
* Cloud-based architecture (only the bindings for the devices are running locally)


## System Architecture

### Overview

Take a look at my [puppet manifests](https://github.com/denschu/homepi-puppet) to setup Home.Pi on a Raspberry Pi very easily with puppet. You also get some help for the manual setup.

### MQTT topics 

#### Naming Conventions

	/home/devices/light1/state ON
	/home/devices/light1/state/set ON

Example for setting a state of a switch 

* Topic: /home/devices/<deviceName>/state/set
* Payload: command (on, off)

Example for getting a state of a switch 

* Topic: /home/devices/<deviceName>/state 
* Payload: state (on, off)


## Configuaration

Place you device configuration in the central configuration file "config.json".

Example:

	[
	   {
	      "id": "lamp_living_room",
	      "name": "Lamp Living Room",
	      "type": "on_off",
	      "state": "off",
	      "topic": "/home/devices/lamp_living_room/state"
	    }
	]

## Local Setup on a Mac

### MQTT Broker

	brew install mosquitto
	mosquitto


### HomePi

	git clone https://github.com/denschu/homepi
	npm install
	grunt serve or /etc/init.d/homepi start 

To monitor the configured topics simply subscribe to all topics

	mosquitto_sub -t /#

	mosquitto_pub -t /home/devices/temperatur_wohnzimmer/state -m on
	

## Cloud Setup on Heroku

First install the Heroku Toolbelt (https://toolbelt.heroku.com/) and Signup for an account

Then execute the following commands from the root of the project

	grunt heroku
	cd heroku
	heroku create
	git add -A
	git commit -m 'deploy' -a
	git push heroku master
	heroku config:add NODE_ENV=production
	heroku config:add MQTT_BROKER_URL=<insert_url_mqtt_broker_here>
	heroku open
	heroku logs

See also https://devcenter.heroku.com/articles/cloudmqtt for detailed information to setup an MQTT Broker

HomePi will publish to the corresponding topics like the following mosquitto_pub-command

	mosquitto_pub -d -t /home/devices/light1/state/set -m "on"

## Available MQTT Bindings (separate git-Repositories)

* [mqtt-exec](https://github.com/denschu/mqtt-exec) (Execute shell commands like "sudo shutdown -h now")
* [mqtt-zway](https://github.com/denschu/mqtt-zway)
* [mqtt-temperature](https://github.com/denschu/mqtt-temperature)
* [mqtt-lirc](https://github.com/denschu/mqtt-lirc)


## Technologies/Frameworks

### Platform
* node.js
* Express (HTTP/Web Server)
* MQTT
* Ionic Framework (with AngularJS)

### Development
* Grunt
* Karma
* SublimeText2

## Planned Features

* Show/Edit configuration of a device
* Integration with [Node-RED](http://nodered.org/)
* Easier deployment on local device
* More bindings
	* WakeOnLAN (wol) 
	* GPIO-PIN (RPi) 
	* IFTT 
	* REST
* ... make a feature request! ... or just a pull request!

For further informations and setup instructions please refer to my [blog post](http://blog.codecentric.de/en/2013/03/home-automation-with-angularjs-and-node-js-on-a-raspberry-pi).