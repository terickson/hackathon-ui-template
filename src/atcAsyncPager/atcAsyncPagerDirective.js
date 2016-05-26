appModule
    .directive('atcAsyncPager', atcAsyncPager);

function atcAsyncPager() {
    return {
        restrict: 'EA',

        templateUrl: 'atcAsyncPager/atcAsyncPager.html',

        scope: {
            objectList: '=atcAsyncPager',
            filter: '=filter',
            queryFunction: '=queryFunction'
        },
        replace: true,

        controller: 'atcAsyncPagerCtrl'
    };
}
