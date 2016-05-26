function atcPagerCtrl($scope, $element, $attrs, pagerService) {
    pagerService.decorate($scope.objectList, $scope.options);
}

appModule.controller('atcPagerCtrl', atcPagerCtrl);
