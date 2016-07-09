appModule.controller('SparkCtrl', function ($scope, $stateParams, navService, Actions, Messages) {
    $scope.message = null;
    $scope.messages = [];
    $scope.sendMessage = sendMessage;
    $scope.getClass = getClass;
    init();

    function init(){
        navService.setActive($stateParams.room);
        $scope.roomname = $stateParams.room;
        
        getMessages();
    }

    function getMessages(){
        Messages.query({title: $scope.roomname}).$promise.then(
            function messages(newMessages)
            {
                $scope.messages = newMessages;
            });
        
    }

    function sendMessage(){
        var newAction = new Actions({
            type: 'spark',
            roomname: $scope.roomname,
            message: $scope.message
        });
        newAction.$save(function success(action) {
            $scope.message = null;
            getMessages();
        },
        function error(response){
            console.log(response);
        });
    }

    function getClass(idx){
        if(idx % 2 === 0){
            return "messageEven";
        }else{
            return "messageOdd";
        }
    }
});
