appModule.config(function ($stateProvider) {
    $stateProvider.state('root.spark', {
        url: '/community/:room',
        pageName: 'Community',
        data: {
            browserTitle: 'Community'
        },
        views: {
            'container@': {
                templateUrl: 'spark/spark.html',
                controller: 'SparkCtrl'
            }
        }
    });
});
