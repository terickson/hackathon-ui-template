appModule.directive('contextor', function contextor() {

    return {
        scope: {
            contextArray: '=',
            contextualValue: '=',
        },
        restrict: 'E',

        template:'{{ displayStatus }}',

        link: function link($scope, $element, $attrs) {
            $scope.$watch('contextArray', function (contexts) {
                if($scope.contextArray){
                    contexts.forEach(function (context){
                        if(context.value === $scope.contextualValue){
                            $scope.displayStatus = context.label;
                        }
                    });
                }
            });
        }
    };
});
