appModule.factory('navService', function () {
    var navMenu = [
        {
            displayName: 'Main',
            url: '#/main',
            name: 'main'
        }
    ];

    var active = { nav: null };

    function setActive(nav) {
        active.nav = nav;
    }

    return {
        navMenu: navMenu,
        active: active,
        setActive: setActive
    };
});
