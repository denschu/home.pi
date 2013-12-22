'use strict';

// Module dependencies.
var express = require('express'),
    path = require('path');

var app = express();

// Express Configuration
app.configure('development', function(){
  app.use(require('connect-livereload')());
  app.use(express.static(path.join(__dirname, '.tmp')));
  app.use(express.static(path.join(__dirname, 'app')));
  app.use(express.errorHandler());
  app.set('views', __dirname + '/app/views');
});

app.configure('production', function(){
  app.use(express.favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(express.static(path.join(__dirname, 'public')));
  app.set('views', __dirname + '/views');
});

app.configure(function(){
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());

  // Router needs to be last
	app.use(app.router);
});

// Controllers
var api = require('./server/routes/api'),
    routes = require('./server/routes');

// Server Routes
app.get('/api/devices', api.devices);
app.get('/api/devices/:id', api.device);
//app.post('/api/devices', api.addDevice);
app.put('/api/devices/:id/state', api.editDevice);
//app.put('/api/devices', api.editAllDevices);
//app.del('/api/devices/:id', api.deleteDevice);

// Angular Routes
app.get('/partials/*', routes.partials);
app.get('/*', routes.index);

// Start server
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});