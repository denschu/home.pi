
app.factory('socket', function ($rootScope) {
  var socket = io.connect('http://localhost:5000');
  console.log('Socket.io connected '+ socket);
  return {
    on: function (eventName, callback) {
      console.log('on-Event received '+ eventName + ' with args ' + arguments[0]);
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      console.log('emit-Event sent '+ eventName + ' with topic: ' + data.topic);
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});