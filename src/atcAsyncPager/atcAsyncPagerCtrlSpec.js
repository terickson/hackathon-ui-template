describe('atcAsyncPagerCtrl', function () {

    var $scope,
        instance;

    var mockResults = [{id: 1}];
    mockResults.$resolved = true;

    beforeEach(function () {

        module("ui-template");

        inject(function ($rootScope, $controller) {
            $scope = $rootScope.$new();
            $scope.filter = {
                limit: 100
            };
            $scope.queryFunction = jasmine.createSpy('queryFunction');
            $scope.queryFunction.and.callFake(function(filter) {
                return mockResults;
            });

            instance = $controller('atcAsyncPagerCtrl', {
                $scope: $scope
            });
        });
    });

    describe("init", function init() {
        it("should set up the filters", function setThemUp() {
            expect($scope.filter.offset).toBe(0);
            expect($scope.filter.currentPage).toBe(1);
            expect($scope.objectList).toBe(mockResults);
        });
    });

    describe("previous page", function prevPage() {
        it("should only go to previous page if the current page is greater than 1", function dontGo() {
            $scope.filter.currentPage = 1;
            $scope.previousPage();
            expect($scope.filter.currentPage).toBe(1);
        });

        it("should go to previous page if the current page is greater than 1", function doGo() {
            $scope.filter.currentPage = 2;
            $scope.filter.offset = 100;
            $scope.previousPage();
            expect($scope.filter.currentPage).toBe(1);
            expect($scope.filter.offset).toBe(0);
            expect($scope.queryFunction).toHaveBeenCalled();
        });
    });

    describe("next page", function nextPage() {
        it("should only go to next page if the current page is full", function dontGo() {
            $scope.filter.currentPage = 1;
            $scope.filter.limit = 100;
            $scope.nextPage();
            expect($scope.filter.currentPage).toBe(1);
        });

        it("should go to previous page if the current page is greater than 1", function doGo() {
            $scope.filter.currentPage = 1;
            $scope.filter.limit = 1;
            $scope.nextPage();
            expect($scope.filter.currentPage).toBe(2);
            expect($scope.filter.offset).toBe(1);
            expect($scope.queryFunction).toHaveBeenCalled();
        });
    });


});
