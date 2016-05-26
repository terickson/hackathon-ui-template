// Declare app level module which depends on filters, and services

// Configure routing
appModule.config(function ($urlRouterProvider) {
    $urlRouterProvider.otherwise("/main");
});

//Place for injecting anything needed on rootscope
appModule.run( function ($rootScope, $state, $interval) {});

// Configure ng-animate to prevent it from trying to animate everything
appModule.config(['$animateProvider', function($animateProvider) {
    // restrict animation to elements with the anim-ng css class.
    $animateProvider.classNameFilter(/anim-ng/);
}]);

appModule.value('restBaseUrl', 'http://ciscoHackathon2016.cloudapp.net:5000/');
