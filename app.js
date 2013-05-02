// this is the entry point to run the built application in production.
'use strict';
var server = require('./server/express');

var options = {
  port: process.env.VCAP_APP_PORT || 8080,
  hostname: process.env.VCAP_APP_HOST,
};

server.use(server.express.static(__dirname + '/dist'));

server.listen(options.port, options.hostname, function() {
  console.log('Web server started on ' + options.hostname + ':' + options.port + ' using the built app in "dist"' + __dirname);
});
