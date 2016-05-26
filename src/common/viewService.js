function viewService() {
    function select() {
        this.$isSelected = !this.$isSelected;
    }

    function initViews() {
        if(!this.$views) {
            this.$views = {};
        }
    }

    function toggleView(view) {
        this.initViews();
        this.$views[view] = !this.$views[view];
    }

    function clearViews() {
        this.$views = {};
    }

    function toggleSingleView(view) {
        this.initViews();
        var previousValue = !this.$views[view];
        this.clearViews();

        this.$views[view] = previousValue;

    }

    function extendFactory(factoryToExtend) {
        if(!factoryToExtend.prototype) {
            factoryToExtend.prototype = {};
        }
        factoryToExtend.prototype.initViews = initViews;
        factoryToExtend.prototype.select = select;
        factoryToExtend.prototype.toggleView = toggleView;
        factoryToExtend.prototype.clearViews = clearViews;
        factoryToExtend.prototype.toggleSingleView = toggleSingleView;

        return factoryToExtend;
    }

    function decorate(someObject) {
        someObject.initViews = initViews;
        someObject.select = select;
        someObject.toggleView = toggleView;
        someObject.clearViews = clearViews;
        someObject.toggleSingleView = toggleSingleView;

        return someObject;
    }

    return {
        extendFactory: extendFactory,
        decorate: decorate
    };
}

appModule.factory('viewService', viewService);
