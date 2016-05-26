appModule.config(function ($stateProvider) {
    $stateProvider.state('root', {
        url: '',
        abstract: true,
        views: {
            'nav': {
                templateUrl: 'nav/nav.html',
                controller: 'NavCtrl'
            }
        }
    });    

    /*
     * Error state, does not change the URL so the user can reload
     */
    $stateProvider.state('error', {
        data: {},
        resolve: {
        },
        views: {
            'nav': {
                templateUrl: 'nav/nav.html',
                controller: 'NavCtrl'
            },
            'container@': {
                templateUrl: 'error/error.html'
            }
        }
    });


});

appModule.run(function ($rootScope,$state) {
    $rootScope.$on('$stateChangeError',
        function(event, toState, toParams, fromState, fromParams){
            $state.go('error');
        });
});
