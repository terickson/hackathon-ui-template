appModule.config(function ($stateProvider) {
    $stateProvider.state('root.temperature', {
        url: '/temperature',
        pageName: 'Temperature',
        data: {
            browserTitle: 'Temperature'
        },
        views: {
            'container@': {
                templateUrl: 'temperature/temperature.html',
                controller: 'TemperatureCtrl'
            }
        }
    });
});
