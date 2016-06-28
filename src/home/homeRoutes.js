appModule.config(function ($stateProvider) {
    $stateProvider.state('root.home', {
        url: '/home',
        pageName: 'Home',
        data: {
            browserTitle: 'Home'
        },
        views: {
            'container@': {
                templateUrl: 'home/home.html',
                controller: 'HomeCtrl'
            }
        }
    });
});
