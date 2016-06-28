appModule.config(function ($stateProvider) {
    $stateProvider.state('root.reports', {
        url: '/reports',
        pageName: 'Reports',
        data: {
            browserTitle: 'Reports'
        },
        views: {
            'container@': {
                templateUrl: 'reports/reports.html',
                controller: 'ReportsCtrl'
            }
        }
    });
});
