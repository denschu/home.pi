'use strict';

// Module dependencies.
var express = require('express');
var path = require('path');

var app = express();

//Passport Stuff
var passport = require('passport');
var Authentication = require('./server/authentication');

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

  //Passport
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'i am not telling you' }));
  // Add csrf support
  app.use(express.csrf({value: Authentication.csrf}));
  app.use(function(req, res, next) {
     res.cookie('XSRF-TOKEN', req.session._csrf);
     next();
  });
  // setup passport authentication
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(Authentication.localStrategy);
  passport.serializeUser(Authentication.serializeUser);
  passport.deserializeUser(Authentication.deserializeUser);

  // Router needs to be last
	app.use(app.router);
});

// Controllers
var api = require('./server/routes/api'),
    routes = require('./server/routes');

// Server Routes
app.get('/api/devices', Authentication.ensureAuthenticated, api.devices);
app.get('/api/devices/:id', Authentication.ensureAuthenticated, api.device);
//app.post('/api/devices', api.addDevice);
app.put('/api/devices/:id/state', Authentication.ensureAuthenticated, api.editDevice);
//app.put('/api/devices', api.editAllDevices);
//app.del('/api/devices/:id', api.deleteDevice);

//Passport
app.post('/login', Authentication.login);
app.get('/logout', Authentication.logout);
app.get('/user', Authentication.ensureAuthenticated, function(req, res, next) {
  return res.json(req.session.user);
})

// Angular Routes
app.get('/partials/*', routes.partials);
app.get('/*', routes.index);

// Start server
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});