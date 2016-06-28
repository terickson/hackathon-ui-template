appModule.controller('FarmCtrl', function ($scope, navService, mySocket) {
    init();
    function init(){
        navService.setActive('farm');
    }
});
