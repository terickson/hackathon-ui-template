appModule.factory('Contexts', function (restFactory) {
    return restFactory('/atc/contexts/:id');
});
