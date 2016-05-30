appModule.controller('TemperatureCtrl', function ($scope, navService, mySocket) {
    init();
    $scope.messages = [];
    $scope.getClass = getClass;
    $scope.resetReadings = resetReadings;

    mySocket.on('tempData', function (message) {
        console.log(message);
        addMessage(message.temperature);
    });

    function init(){
        navService.setActive('temperature');
    }

    function resetReadings(){
        $scope.messages = [];
    }    

    function addMessage(text){
        $scope.messages.push({id: Date(), value: text});
        if($scope.messages.length > 10){
            $scope.messages.shift();
        }
    }

    function getClass(idx){
        if(idx % 2 === 0){
            return "messageEven";
        }else{
            return "messageOdd";
        }
    }    
});
