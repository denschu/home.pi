#! /bin/sh
grunt heroku
ssh pi@raspberrypi.local 'rm -r home.pi'
rsync -rtvz --exclude '.git' heroku/ pi@raspberrypi.local:/home/pi/home.pi
ssh pi@raspberrypi.local 'cd home.pi; /opt/node/bin/npm install --production'