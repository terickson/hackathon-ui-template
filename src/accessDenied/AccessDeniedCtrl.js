appModule.controller('AccessDeniedCtrl', AccessDeniedCtrl);

function AccessDeniedCtrl(navService) {

    init();

    function init() {
        navService.setActive('');
    }

}
