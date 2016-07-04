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
            url: '#/community/local',
            name: 'local'
        },
        {
            displayName: 'Global',
            url: '#/community/global',
            name: 'global'
        },
        {
            displayName: 'Reports',
            url: '#/reports',
            name: 'reports'
        },
        {
            displayName: 'About',
            url: '#/businessCase',
            name: 'businessCase'
        },
        {
            displayName: 'Thanks',
            url: '#/thankYou',
            name: 'thankYou'
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
