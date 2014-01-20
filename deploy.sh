#! /bin/sh
grunt heroku
ssh pi@homepi.local 'rm -r home.pi'
rsync -rtvz --exclude '.git' heroku/ pi@homepi.local:/home/pi/home.pi
ssh pi@homepi.local 'cd home.pi; /opt/node/bin/npm install --production'