appModule.directive('wwtInputFocus', function wwtInputFocusDirective($timeout) {

    return function(scope, elem, attr) {
        scope.$on('wwtFocus', function(e, name) {
            if(name === attr.wwtInputFocus){
                $timeout(function () {
                    elem[0].focus();
                }, 250);
            }
        });
    };
});
