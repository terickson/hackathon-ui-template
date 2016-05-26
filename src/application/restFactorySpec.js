describe('restFactory', function () {

    var instance,
        resource,
        rootScope,
        User,
        $cacheFactory,
        restFactory;


    beforeEach(function () {

        var mockNgResource = jasmine.createSpy('mockResource');

        var mockUser = {
            get: function (){
                return {
                    $promise: {
                        then: function () {
                        }
                    }
                };
            },
            prototype: {}
        };

        module("ui-template", function($provide) {
            $provide.value('$resource', mockNgResource);
            $provide.value('User', mockUser);
        });
    });

    beforeEach(inject(function(restFactory, _$resource_, _$cacheFactory_, $rootScope, _User_) {
        instance = restFactory;
        rootScope = $rootScope;
        resource = _$resource_;
        $cacheFactory = _$cacheFactory_;
    }));

    describe('#restFactory(urlString, noCacheFlag)', function () {
        it('should correctly parse the url string passed in', function () {
            var url = '/some/:blahId/url/:blehId';
            var expectedUrlString = '/apirouter/api/forward/some/:blahId/url/:blehId';
            var expecedIdMap = {blahId: '@blahId', blehId: '@blehId'};
            var expectedPutMethod = {update: {method: 'PUT'}, get: {method: 'GET', cache: $cacheFactory}, query: {method: 'GET', cache: $cacheFactory, isArray: true}};

            instance(url);

            expect(resource).toHaveBeenCalledWith(expectedUrlString, expecedIdMap, expectedPutMethod);

        });

        it('should not cache the gets if the flag is passed', function () {
            var url = '/some/:blahId/url/:blehId';
            var expectedUrlString = '/apirouter/api/forward/some/:blahId/url/:blehId';
            var expecedIdMap = {blahId: '@blahId', blehId: '@blehId'};
            var expectedPutMethod = {update: {method: 'PUT'}};

            instance(url, true);

            expect(resource).toHaveBeenCalledWith(expectedUrlString, expecedIdMap, expectedPutMethod);
        });
    });
});
