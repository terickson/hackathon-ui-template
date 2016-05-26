appModule.config(function ($stateProvider) {

    var accessDenied = {
        name: 'root.denied',
        url: '/denied',
        pageName: 'Access Denied',
        data: {
            browserTitle: 'Access Denied'
        },
        views: {
            'container@': {
                templateUrl: 'accessDenied/accessDenied.html',
                controller: 'AccessDeniedCtrl'
            }
        }
    };

    $stateProvider.state(accessDenied);

});
