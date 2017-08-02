(function() {
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {

        $routeProvider

        // home page
            .when('/', {
                templateUrl: 'app/main/main.html',
                controller: 'mainController'
            })
            .when('/sign-in', {
                templateUrl: 'app/auth/signin.html',
                controller: 'signInController'
            })
            .when('/sign-up', {
                templateUrl: 'app/auth/signup.html',
                controller: 'signUpController'
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('authHttpResponseInterceptor');

    }])

        .factory('authHttpResponseInterceptor', ['$q', '$location', function ($q, $location) {

            return {
                request: function (request) {
                    var token = localStorage.userToken;
                    request.headers.token = token;
                    return request;
                },
                response: function (response) {
                    if (response.status === 401) {
                    }
                    return response || $q.when(response);
                },
                responseError: function (rejection) {
                    if (rejection.status === 401) {
                        localStorage.removeItem("userToken");
                        $location.path('/');
                    }
                    return $q.reject(rejection);
                }
            };
        }]);
})();