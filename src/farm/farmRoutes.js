appModule.config(function ($stateProvider) {
    $stateProvider.state('root.farm', {
        url: '/farm',
        pageName: 'Farm',
        data: {
            browserTitle: 'Farm'
        },
        views: {
            'container@': {
                templateUrl: 'farm/farm.html',
                controller: 'FarmCtrl'
            }
        }
    });
});
