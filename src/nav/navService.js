appModule.factory('navService', function () {
    var navMenu = [
        {
            displayName: 'Main',
            url: '#/main',
            name: 'main'
        },
        {
            displayName: 'Temperature',
            url: '#/temperature',
            name: 'temperature'
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
