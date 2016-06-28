appModule.config(function ($stateProvider) {
    $stateProvider.state('root.local', {
        url: '/localCommunity',
        pageName: 'Local',
        data: {
            browserTitle: 'Local'
        },
        views: {
            'container@': {
                templateUrl: 'local/local.html',
                controller: 'LocalCtrl'
            }
        }
    });
});
