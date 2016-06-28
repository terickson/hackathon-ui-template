appModule.config(function ($stateProvider) {
    $stateProvider.state('root.thankYou', {
        url: '/thankYou',
        pageName: 'ThankYou',
        data: {
            browserTitle: 'Thank You'
        },
        views: {
            'container@': {
                templateUrl: 'thankYou/thankYou.html',
                controller: 'ThankYouCtrl'
            }
        }
    });
});
