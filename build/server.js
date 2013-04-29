/**
 * Module dependencies.
 */
var express = require('express'),
    api = require('./routes/api');
var app = express();

// Configuration

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


app.get('/devices', api.devices);
app.get('/devices/:id', api.device);
app.post('/devices', api.addDevice);
app.put('/devices/:id', api.editDevice);
app.put('/devices', api.editAllDevices);
app.del('/devices/:id', api.deleteDevice);

//app.get('/devices/:id/commands', api.commands);
//app.get('/devices/:id/commands/:cid', api.command);
//app.put('/devices/:id/commands/:cid', api.editCommand);


// Start server
app.listen(8000);
console.log("Server running at http://127.0.0.1:8000/");