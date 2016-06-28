appModule.controller('ReportsCtrl', function ($scope, navService) {
    init();
    function init(){
        navService.setActive('reports');
    }
});
