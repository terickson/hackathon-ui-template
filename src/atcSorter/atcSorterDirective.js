appModule.directive('atcSorter', function atcSorter() {

    return {
        restrict: 'EA',

        scope: {
            objectList: '=atcSorter',
            options: '=options'
        },

        templateUrl: 'atcSorter/atcSorter.html',

        controller: function ctrl($scope, $element, $attrs, sortService) {
            $scope.$watch('objectList', function (newVal) {
                sortService.decorate($scope.objectList, $scope.options);
            }, true);
        },

        replace: true,

        link: function postLink(scope, elm, attrs) {

        }
    };
});
