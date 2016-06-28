appModule.config(function ($stateProvider) {
    $stateProvider.state('root.global', {
        url: '/globalCommunity',
        pageName: 'Global',
        data: {
            browserTitle: 'Global'
        },
        views: {
            'container@': {
                templateUrl: 'global/global.html',
                controller: 'GlobalCtrl'
            }
        }
    });
});
