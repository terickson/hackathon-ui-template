function notify() {
    return {
        restrict: 'EA',
        templateUrl: 'notify/notify.html',
        controller: ['$scope', 'notifyEvents', 'notifyService', function ctrl($scope, notifyEvents, notifyService) {

            $scope.message = null;
            $scope.notifications = notifyService.getNotifications();

            $scope.$on(notifyEvents.newNotification, function (message) {
                $scope.notifications = notifyService.getNotifications();
            });

            $scope.dismiss = notifyService.dismiss;

        }],
        link: function postLink(scope, elm, attrs) {

        }
    };
}

appModule.directive('notify', notify);
