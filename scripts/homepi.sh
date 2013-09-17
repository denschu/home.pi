#! /bin/sh
# /etc/init.d/homepi

### BEGIN INIT INFO
# Provides:          homepi
# Required-Start:    $remote_fs $syslog
# Required-Stop:     $remote_fs $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: Starts homepi at boot
# Description:       A script which will start / stop homepi at boot / shutdown.
### END INIT INFO

# If you want a command to always run, put it here

# Carry out specific functions when asked to by the system
case "$1" in
  start)
    echo "Starting homepi"
    # run application you want to start
    NODE_JS_HOME="/opt/node"
    PATH="$PATH:$NODE_JS_HOME/bin"
    export PATH
    /opt/node/bin/forever start /home/pi/home.pi/app.js
    ;;
  stop)
    echo "Stopping homepi"
    # kill application you want to stop
    NODE_JS_HOME="/opt/node"
    PATH="$PATH:$NODE_JS_HOME/bin"
    export PATH
    /opt/node/bin/forever stop app.js
    ;;
  *)
    echo "Usage: /etc/init.d/homepi {start|stop}"
    exit 1
    ;;
esac

exit 0
