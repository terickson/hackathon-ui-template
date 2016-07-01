appModule.factory('Messages', function (restFactory) {
    return restFactory('/rooms/:title/messages/:id', true);
});
