appModule.factory('focusCaster', function ($rootScope, $timeout) {
    return function(name) {
        $timeout(function(e) {
            $rootScope.$broadcast('wwtFocus', name);
        });
    };
});

