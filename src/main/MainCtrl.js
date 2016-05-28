appModule.controller('MainCtrl', function ($scope, navService, Actions, mySocket) {
    init();
    $scope.messages = [];
    $scope.testTropo = testTropo;
    $scope.testSpark = testSpark;
    $scope.testAlert = testAlert;
    $scope.getClass = getClass;
    $scope.clearAlert = clearAlert;
    $scope.alert = null;
    $scope.phoneNumbers = null;
    mySocket.on('alert', function (message) {
        $scope.alert = message.data;
    });

    function init(){
        navService.setActive('main');
    }

    function clearAlert(){
        $scope.alert = null;
    }    

    function testTropo(){
        var phoneNumberArray = $scope.phoneNumbers.split(',');
        var newAction = new Actions({
            type: 'tropo',
            phoneNumbers: phoneNumberArray,
            message:"This is a test"
        });
        newAction.$save(function success(action) {
            addMessage('Tropo Action Processed: ' + action.id);
        },
        function error(response){
            addMessage('Tropo Action Failed. Error: ' + response.status + ' ' + response.statusText);
        });
        $scope.phoneNumbers = null;
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

    function testAlert(){
        var newAction = new Actions({
            type: 'spark',
            roomname: "hackathon2016",
            message:"ALERT: This is a test of the alert system"
        });
        newAction.$save(function success(action) {
            addMessage('Alert Processed: ' + action.id);
        },
        function error(response){
            addMessage('Alert Failed. Error: ' + response.status + ' ' + response.statusText);
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
