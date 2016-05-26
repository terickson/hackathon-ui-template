appModule.controller('MainCtrl', function ($scope, navService, Actions, mySocket) {
    init();
    $scope.messages = [];
    $scope.testTropo = testTropo;
    $scope.testSpark = testSpark;
    $scope.getClass = getClass;
    $scope.alert = null;
    mySocket.on('alert', function (message) {
        $scope.alert = message.data;
    });

    function init(){
        navService.setActive('main');
    }

    function testTropo(){
        var newAction = new Actions({
            type: 'tropo',
            phoneNumbers: ["15209756399"],
            message:"This is a test"
        });
        newAction.$save(function success(action) {
            addMessage('Tropo Action Processed: ' + action.id);
        },
        function error(response){
            addMessage('Tropo Action Failed. Error: ' + response.status + ' ' + response.statusText);
        });
    }

    function testSpark(){
        var newAction = new Actions({
            type: 'spark',
            roomname: "hackathon2016",
            message:"This is a test"
        });
        newAction.$save(function success(action) {
            addMessage('Spark Action Processed: ' + action.id);
        },
        function error(response){
            addMessage('Spark Action Failed. Error: ' + response.status + ' ' + response.statusText);
        });
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
