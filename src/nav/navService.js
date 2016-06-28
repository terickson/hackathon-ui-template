appModule.factory('navService', function () {
    var navMenu = [
        {
            displayName: 'Home',
            url: '#/home',
            name: 'home'
        },    
        {
            displayName: 'Farm',
            url: '#/farm',
            name: 'farm'
        },
        {
            displayName: 'Local',
            url: '#/localCommunity',
            name: 'local'
        },
        {
            displayName: 'Global',
            url: '#/globalCommunity',
            name: 'global'
        },
        {
            displayName: 'Reports',
            url: '#/reports',
            name: 'reports'
        },
        {
            displayName: 'BC',
            url: '#/businessCase',
            name: 'businessCase'
        },
        {
            displayName: 'Thanks',
            url: '#/thankYou',
            name: 'thankYou'
        },
        {
            displayName: 'Spark/Tropo Demo',
            url: '#/main',
            name: 'main'
        },
        {
            displayName: 'Relayr Demo',
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
