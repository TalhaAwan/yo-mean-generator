(function(){
    angular.module('boilerplate').factory('authService', ['$http', function($http) {
        return {
            create: function (obj, success, error) {
                $http.post('/api/users/', obj).
                success(function (data) {
                    success(data);
                }).
                error(function (data) {
                    error(data);
                });
            },
            localAuth : function (obj, success, error) {
                $http.post('/api/auth/local', obj).
                success(function (data) {
                    success(data);
                }).
                error(function (data) {
                    error(data);
                });
            }
        };

    }]);
}
)();
