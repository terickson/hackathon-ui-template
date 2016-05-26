appModule.config(function ($stateProvider) {
    $stateProvider.state('root.main', {
        url: '/main',
        pageName: 'Main',
        data: {
            browserTitle: 'Main'
        },
        views: {
            'container@': {
                templateUrl: 'main/main.html',
                controller: 'MainCtrl'
            }
        }
    });
});
