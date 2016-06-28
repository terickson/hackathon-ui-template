appModule.controller('GlobalCtrl', function ($scope, navService) {
    init();
    function init(){
        navService.setActive('global');
    }
});
