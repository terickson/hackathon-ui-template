function sortService() {

    function sortBy(field) {
        this.$sortOptions.field = field;
        this.$sortOptions.desc = true;
    }

    function toggleSortOrder() {
        this.$sortOptions.desc = !this.$sortOptions.desc;
    }

    function decorate(list, options) {
        list.$sortOptions = options;
        list.$toggleSortOrder = toggleSortOrder;
        list.$sortBy = sortBy;
        return list;
    }

    return {
        decorate: decorate
    };
}

appModule.factory('sortService', sortService);

