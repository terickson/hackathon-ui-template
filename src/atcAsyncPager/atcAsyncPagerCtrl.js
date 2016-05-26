appModule
    .controller('atcAsyncPagerCtrl', atcAsyncPagerCtrl);

function atcAsyncPagerCtrl($scope) {

    $scope.previousPage = previousPage;
    $scope.nextPage = nextPage;
    $scope.canGoToPreviousPage = canGoToPreviousPage;
    $scope.canGoToNextPage = canGoToNextPage;

    init();

    function init() {
        $scope.filter.offset = 0;
        $scope.filter.currentPage = 1;
        $scope.objectList = $scope.queryFunction($scope.filter);
    }

    function previousPage() {
        if (canGoToPreviousPage()) {
            $scope.filter.currentPage--;
            $scope.filter.offset-=$scope.filter.limit;
            $scope.objectList = $scope.queryFunction($scope.filter);
        }
    }

    function nextPage() {
        if(canGoToNextPage()) {
            $scope.filter.currentPage++;
            $scope.filter.offset += $scope.filter.limit;
            $scope.objectList = $scope.queryFunction($scope.filter);
        }
    }

    function canGoToPreviousPage() {
        return $scope.objectList.$resolved && $scope.filter.currentPage > 1;
    }

    function canGoToNextPage() {
        return $scope.objectList.$resolved && $scope.objectList.length === $scope.filter.limit;
    }
}

