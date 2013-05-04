#! /bin/sh
scp app.js pi@raspberrypi.local:home.pi/app.js
scp package.json pi@raspberrypi.local:home.pi/package.json
scp -r dist pi@raspberrypi.local:home.pi/dist
scp -r server pi@raspberrypi.local:home.pi/server
scp scripts/homepi.sh pi@raspberrypi.local:home.pi/homepi.sh
