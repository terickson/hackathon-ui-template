appModule.factory('restFactory', function ($resource, $cacheFactory, restBaseUrl) {
    function resourceBuilder (url, noCache, overrides) {
        var splitUrl = url.split('/');
        var idsObj = {};

        splitUrl.each(function (id) {
            if(id[0] === ':') {
                var idKey = id.from(1);
                idsObj[idKey] = '@' + idKey;
            }
        });

        var methods = {
            update: {
                method: 'PUT'
            }
        };

        //can pass in an optional flag not to cache gets
        if(!noCache) {
            methods.get = {
                method: 'GET',
                cache: $cacheFactory
            };

            methods.query = {
                method: 'GET',
                cache: $cacheFactory,
                isArray: true
            };
        }

        return $resource(restBaseUrl + url, idsObj, _.assign(methods, overrides));
    }

    return resourceBuilder;
});
