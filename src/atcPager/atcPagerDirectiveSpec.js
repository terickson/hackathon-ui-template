describe('atcPagerDirective', function () {

    var instance,
        $scope,
        element;

    beforeEach(function () {
        module("ui-template");

        inject(function($rootScope, $compile) {
            $scope = $rootScope.$new();

            $scope.objectList = [];
            for (var i = 0; i< 100; i++){
                $scope.objectList.push({id: i});
            }
            $scope.pagerOptions = {
                currentPage: 1,
                itemsPerPage: 24
            };
            element = '<atc-pager="objectList" options="pagerOptions"></atc-pager>';
            element = $compile(element)($scope);

            $scope.$digest();
        });
    });

    describe('initialization', function () {
        // iit('should replace the html directive tag', function () {
        //     console.log(element.html());

        // //     var elementHtml = element.html();
        // //     console.log(elementHtml);

        // //     expect(elementHtml).toContain('objectList');
        // });
    });
});
