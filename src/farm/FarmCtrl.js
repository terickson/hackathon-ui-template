appModule.controller('FarmCtrl', function ($scope, navService, Sensors, $interval) {
    init();

    $scope.hivePicShow = false;
    $scope.baseHiveImageUrl = 'http://guidoslabs.com/sensorFiles/blendedThermal_image.png';
    $scope.hiveTemp = null;
    $scope.hiveImageUrl = $scope.baseHiveImageUrl;
    $scope.beeCount1 = 0;
    $scope.beeCount2 = 0;
    $scope.beeCount3 = 0;
    $scope.beeCount4 = 0;
    function getSensors(){
        Sensors.query().$promise.then(
            function sensors(sensorList)
            {
                console.log(sensorList);
                var currentTimeStamp = new Date().getTime();
                $scope.hiveImageUrl = $scope.baseHiveImageUrl + '?timestamp='+currentTimeStamp;

                for(var i = 0; i < sensorList.length; i++){
                    $scope[sensorList[i].name] = sensorList[i].value;
                }
            });
        
    }
    
    function init(){
        navService.setActive('farm');
        getSensors();
        $interval(getSensors, 1000);
    }
});
