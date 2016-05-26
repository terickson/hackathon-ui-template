appModule.directive('atcPager', function atcPager() {

    return {
        restrict: 'EA',

        templateUrl: 'atcPager/atcPager.html',

        scope: {
            objectList: '=atcPager',
            options: '=options'
        },

        replace: true,
        controller: 'atcPagerCtrl',

        link: function postLink(scope, elm, attrs) {

        }
    };
});
