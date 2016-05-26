function category() {
    return function(items, filterType) {
        var result = [];

        if(filterType === 'All' || !filterType) {
            return items;
        } else if (filterType === "Uncategorized") {
            items.each(function (item) {
                if(item.practices.length === 0) {
                    result.push(item);
                }
            });
        } else {
            items.each(function (item) {
                var unfiltered = false;
                item.practices.each(function (practice) {
                    if (practice.name === filterType) {
                        unfiltered = true;
                    }
                });

                if(unfiltered === true){
                    result.push(item);
                }

            });
        }
        return result;
    };
}

appModule.filter('category', category);
