appModule.factory('Actions', function (restFactory) {
    return restFactory('/actions/:id');
});
