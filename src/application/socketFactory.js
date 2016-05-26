appModule.factory('mySocket', function (socketFactory, restBaseUrl) {
  var myIoSocket = io.connect(restBaseUrl);

  var mySocket = socketFactory({
    ioSocket: myIoSocket
  });

  return mySocket;
});