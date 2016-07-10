appModule.factory('navService', function () {
    var navMenu = [
        {
            displayName: 'Home',
            url: '#/home',
            name: 'home',
            icon: ''
        },
        {
            displayName: 'Stats',
            url: '#/farm',
            name: 'farm',
            icon: 'fa-dashboard'
        },
        {
            displayName: 'Local',
            url: '#/community/local',
            name: 'local',
            icon: 'fa-truck'
        },
        {
            displayName: 'Global',
            url: '#/community/global',
            name: 'global',
            icon: 'fa-globe'
        },
        {
            displayName: 'Reports',
            url: '#/reports',
            name: 'reports',
            icon: 'fa-area-chart'
        },
        {
            displayName: 'About',
            url: '#/businessCase',
            name: 'businessCase',
            icon: 'fa-heart-o'
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
