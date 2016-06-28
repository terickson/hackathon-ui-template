appModule.controller('HomeCtrl', function ($scope, navService) {
    init();

    function init(){
        navService.setActive('home');
    }    
});
