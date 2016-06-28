appModule.controller('LocalCtrl', function ($scope, navService) {
    init();
    function init(){
        navService.setActive('local');
    }
});
