appModule.config(function ($stateProvider) {
    $stateProvider.state('root.businessCase', {
        url: '/businessCase',
        pageName: 'BusinessCase',
        data: {
            browserTitle: 'businessCase'
        },
        views: {
            'container@': {
                templateUrl: 'businessCase/businessCase.html',
                controller: 'BusinessCaseCtrl'
            }
        }
    });
});
