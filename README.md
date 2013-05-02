# Home.Pi 
=============

#Home Automation with node.js, express and AngularJS

##Setup 

	npm install
	grunt

## Start 

	/etc/init.d/homepi start


##Features

*Bindings
** Shell (Execute shell commands like "sudo shutdown -h now")
** IR
** ELV Max!
** WakeOnLAN (wol) (planned)
** GPIO-PIN (RPi) (planned)
** IFTT (planned)


* Devices
** List all devices
** Add/Remove device 

* Groups
** Group devices together
** Show a group view

* Commands

*Configuration
*+ Show configuration
** Edit configuration

*Events
** Create a event reaction for a device
** Send an event from a device


##REST API

[Documentation on apiary.io](http://apiary.io/home.pi-server)

###Add a new device to the configuration
	curl -i -X POST -H 'Content-Type: application/json' -d '{"id": 0,"name": "Stehlampe Wand","type": "on_off", "state": "off","commands": [{ "name": "on", "command": "sudo /home/pi/rcdevice-pi/sendRev B 1 1" },{ "name": "off", "command": "sudo /home/pi/rcswitch-pi/sendRev B 1 0" }]}' http://raspberrypi:8000/devices

###Get the list of active devices
	curl -i -X GET http://raspberrypi:8000/devices

###Turn device on
    curl -i -X PUT -H 'Content-Type: application/json' -d '{"state": "on"}' http://raspberrypi:8000/devices/0

###Turn device off
    curl -i -X PUT -H 'Content-Type: application/json' -d '{"state": "off"}' http://raspberrypi:8000/devices/0

###Remove device configuration
	curl -i -X DELETE http://raspberrypi:8000/devices/0


#Technologies/Frameworks

## Platform
* node.js
** Express (HTTP/Web Server)
** Architect (for plugin architecture)

## Persistence
* InMemory-DB?

## GUI
* AngularJS
* KendoUI

## Development
* Grunt
* Karma
* SublimeText2


For further informations and setup instructions please refer to my [blog post](http://blog.codecentric.de/en/2013/03/home-automation-with-angularjs-and-node-js-on-a-raspberry-pi).