appModule.controller('FarmCtrl', function ($scope, navService, mySocket) {
    init();

    $scope.hivePicShow = false;
    $scope.baseHiveImageUrl = 'http://guidoslabs.com/sensorFiles/blendedThermal_image.png';
    $scope.hiveTemp = null;
    $scope.hiveImageUrl = $scope.baseHiveImageUrl;
    mySocket.on('hiveTempChange', function (message) {
        var currentTimeStamp = new Date().getTime();
        $scope.hiveTemp = message.temperature;
        $scope.hiveImageUrl = $scope.baseHiveImageUrl + '?timestamp='+currentTimeStamp;
    });

    $scope.beeCount1 = 0;
    $scope.beeCount2 = 0;
    $scope.beeCount3 = 0;
    $scope.beeCount4 = 0;
    mySocket.on('beeCountChange1', function (message) {
        $scope.beeCount1 = message.count;
    });
    mySocket.on('beeCountChange2', function (message) {
        $scope.beeCount2 = message.count;
    });
    mySocket.on('beeCountChange3', function (message) {
        $scope.beeCount3 = message.count;
    });
    mySocket.on('beeCountChange4', function (message) {
        $scope.beeCount4 = message.count;
    });

    function init(){
        navService.setActive('farm');
    }
});
