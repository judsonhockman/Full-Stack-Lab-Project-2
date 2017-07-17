angular.module('AngularBlog', ['ngRoute', 'ngResource', 'AngularBlog.factories', 'AngularBlog.controllers', 'AngularBlog.services'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/', {
        templateUrl: 'views/list.html',
        controller: 'PostListController'
    })
    .when('/compose', {
        templateUrl: 'views/compose.html',
        controller: 'ComposePostController'
    })
    .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
    })
    .when('/users', {
        templateUrl: 'views/login.html',
        controller: 'UserListController',
        requiresLogin: true,
        requirsLogin: true
    })
    .when('/donate', {
        templateUrl: 'views/donate.html',
        controller: 'DonationController'
    })
    .when('/:id/update', {
        templateUrl: 'views/update.html',
        controller: 'UpdatePostController'
    })
    .when('/:id', {
        templateUrl: 'views/single.html',
        controller: 'SinglePostController'
    })
    .otherwise({
        redirectTo: '/'
    });
}])
.run(['$rooteScope', '$location', 'UserService', function
($rooteScope, $location, UserService) {
    $rootScope.$on('$routeChangeStart', function(event, 
    nextRoute, previousRoute) {
        if (nextRoute.$$route.requiresLogin &&
        !UserService.isLoggedIn()) {
            event.preventDefault();
            UserService.loginRedirect();
        } else if (nextRoute.$$route.requiresAdmin &&
        !UserService.isAdmin()) {
            event.preventDefault();
            $location.replace().path('/');
        }
    });
}]);