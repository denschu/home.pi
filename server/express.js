/**
 * Module dependencies.
 */
var express = require('express'),
    api = require('./routes/api');
var app = express();
var server = require('http').createServer(app);
var io  = require('socket.io').listen(5000);

// Configuration

try {
  // use livereload middleware
  app.use(require('grunt-contrib-livereload/lib/utils').livereloadSnippet);
} catch(ex) {
  //no such thing in production
}

// ## CORS middleware
// 
// see: http://stackoverflow.com/questions/7067966/how-to-allow-cors-in-express-nodejs
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
      
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.configure(function(){
  app.use(express.methodOverride());
  app.use(allowCrossDomain);
  app.use(express.bodyParser());
});


app.get('/api/devices', api.devices);
app.get('/api/devices/:id', api.device);

exports = module.exports = server;

exports.use = function() {
  app.use.apply(app, arguments);
};

exports.express = express;


// Start server
//app.listen(8000);
//console.log("Server running at http://127.0.0.1:8000/");