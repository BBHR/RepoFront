angular.module('BiBiApp')
.service('authProvider', function($http,$window) {
    var self = this;
    this.token = '';
    this.register = function(user, callback) {
        var regInfo = {};
        for (var attr in user) {
            regInfo[attr] = user[attr];
        };
        regInfo.user_phone_number = regInfo.user_phone_number && regInfo.user_phone_number.replace(/[^\d]/g, '');
        $http.post('/back/web/auth/sign-up', {
                user: regInfo
            })
            .then(function(response) {
                callback && callback(response.data);
            }, function(err) {
                console.log(err);
            });
    };
    this.checkAuth = function(callback) {
        var request = {
            method: 'POST',
            url: '/back/web/auth/index',
        };
        $http(request)
            .then(function(response) {
                var dataSet = angular.copy(response.data.data);
                dataSet.user_phone_number +=  "";
                dataSet.user_phone_number = dataSet.user_phone_number.replace(/(\d)(\d{3})(\d{3})(\d{2})(\d{2})/i,"+$1 ($2) $3-$4-$5");
                callback && callback(dataSet);
            }, function(err) {});
    };

    this.login = function(email, password, callback) {
        var loginRequest = {
            method: 'POST',
            url: '/back/web/auth/login',
            data: JSON.stringify({
                login: {
                    username: email,
                    password: password
                }
            })
        };
        $http(loginRequest)
            .then(function(response) {
                if (parseInt(response.data.statusCode) === 200) {
                    window.localStorage.setItem('bibi-token', response.data.data);
                } else {
                }
                callback && callback(response.data);
            })
    };
    this.logout = function(callback) {
        $window.localStorage.removeItem('bibi-token');
        callback && callback();
    };
})
// auth interceptor for keeping auth
.factory('authInterceptor', function($q, $window, $location) {
    return {
        request: function(config) {
            if ($window.localStorage.getItem('bibi-token')) {
                //HttpBearerAuth
                config.headers.Authorization = 'Bearer ' + $window.localStorage.getItem('bibi-token');
            }
            return config;
        }
    };
});
