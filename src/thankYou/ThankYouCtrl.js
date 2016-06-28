appModule.controller('ThankYouCtrl', function ($scope, navService) {
    init();
    function init(){
        navService.setActive('thankYou');
    }
});
