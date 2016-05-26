appModule.controller('WwtUserTypeaheadCtrl', WwtUserTypeaheadCtrl);

function WwtUserTypeaheadCtrl($scope, usersService) {
    $scope.userFullSearch = userFullSearch;
    $scope.buildFullNameAndUserName = buildFullNameAndUserName;

    function buildFullNameAndUserName(person) {
        if($scope.wwtUserTypeaheadIsSnuser === 'true' && person) {
            return ((person.name) + ' - ' + person.userName);
        } else if (person) {
            return ((person.fullName) + ' - ' + person.userName);
        }
        return '';
    }

    function userFullSearch(search) {
        if($scope.wwtUserTypeaheadIsSnuser === 'true') {
            return usersService.sn0Search(search);
        } else {
            return usersService.search(search);
        }
    }
}
