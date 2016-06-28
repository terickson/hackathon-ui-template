appModule.controller('BusinessCaseCtrl', function ($scope, navService) {
    init();
    function init(){
        navService.setActive('businessCase');
    }

});
