#!/bin/bash
#
# 

#Start MQTT Broker
#mosquitto

#Publish configuration topics
mosquitto_pub -d -r -t home/devices/light1/config/name -m "Lamp 1"
mosquitto_pub -d -r -t home/devices/light1/config/type -m "on_off"
mosquitto_pub -d -r -t home/devices/light1/config/command/on  -m "echo turnOn"
mosquitto_pub -d -r -t home/devices/light1/config/command/off  -m "echo turnOff"

mosquitto_pub -d -r -t home/devices/light2/config/name -m "Lamp 2"
mosquitto_pub -d -r -t home/devices/light2/config/type -m "on_off"
mosquitto_pub -d -r -t home/devices/light2/config/command/on  -m "echo turnOn"
mosquitto_pub -d -r -t home/devices/light2/config/command/off  -m "echo turnOff"

mosquitto_pub -d -r -t home/devices/light3/config/name -m "Lamp 3"
mosquitto_pub -d -r -t home/devices/light3/config/type -m "on_off"
mosquitto_pub -d -r -t home/devices/light3/config/command/on  -m "echo turnOn"
mosquitto_pub -d -r -t home/devices/light3/config/command/off  -m "echo turnOff"

#Start Socket.IO MQTT Bridge

#Start Bindings
#node mqtt-exec -t home/devices/light1/state/set,home/devices/light2/state/set,home/devices/light3/state/set
#mosquitto_sub -d -t hello/world

#Start Server
# grunt server
#nohup node app.js > /home/pi/logs/homepi.log &


#./interfaces/websocket/WSS_static_osx
