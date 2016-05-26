appModule.controller('NavCtrl', function ($scope, $rootScope, navService, $state, focusCaster, restBaseUrl) {

    $scope.focusInput = focusCaster;
    $scope.navMenu = navService.navMenu;
    $scope.active = navService.active;
    $scope.currentEnv = null;
    init();

    function init() {
        
    }
});
