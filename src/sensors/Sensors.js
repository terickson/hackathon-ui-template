appModule.factory('Sensors', function (restFactory) {
    return restFactory('/sensors/:name', true);
});
