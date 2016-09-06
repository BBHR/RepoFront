// jshint esversion:6
var App = angular.module('BiBiApp', ['ngRoute', 'ngAnimate', 'ngMaterial', 'ngMessages']);
App.factory('authInterceptor', function($q, $window, $location) {
    return {
        request: function(config) {
            if ($window.localStorage.getItem('bibi-token')) {
                //HttpBearerAuth
                config.headers.Authorization = 'Bearer ' + $window.localStorage.getItem('bibi-token');
            }
            return config;
        },
        responseError: function(rejection) {
            if (rejection.status === 401) {
                $window.localStorage.removeItem('bibi-token');
                $location.path('main').replace();
            }
            return $q.reject(rejection);
        }
    };
});

App.config(['$routeProvider', '$httpProvider', '$compileProvider', function($routeProvider, $httpProvider, $compileProvider) {
    $httpProvider.interceptors.push('authInterceptor');
    $compileProvider.debugInfoEnabled(false);
    var dirs = [
        'reg', 'main', 'profile', 'me', 'reguser', 'regtype'
    ];
    dirs.forEach(function(name) {
        var ctrlName = name[0].toUpperCase() + name.slice(1);
        $routeProvider.when('/' + name, {
            templateUrl: 'views/' + name + '.html',
            controller: ctrlName + 'Ctrl'
        });
    });
    $routeProvider.when('/profile/:section', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
    });
    $routeProvider.when('/me/:section', {
        templateUrl: 'views/me.html',
        controller: 'MeCtrl'
    });
    $routeProvider.otherwise({
        redirectTo: '/main'
    });
}]);
App.service('authProvider', function($http) {
    var self = this;
    this.token = '';
    this.register = function(user, callback) {
        var regInfo = {};
        for (var attr in user) {
            regInfo[attr] = user[attr];
        };
        regInfo.user_phone_number = regInfo.user_phone_number && regInfo.user_phone_number.replace(/[^\d]/g, '');
        $http.post('http://bibihelpertest.ru.swtest.ru/web/auth/sign-up', {
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
            url: 'http://bibihelpertest.ru.swtest.ru/web/auth/index',
        };
        $http(request)
            .then(function(response) {
                callback && callback(response.data.data);
            }, function(err) {});
    };

    this.login = function(email, password, callback) {
        var loginRequest = {
            method: 'POST',
            url: 'http://bibihelpertest.ru.swtest.ru/web/auth/login',
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
        window.localStorage.removeItem('bibi-token');
        callback && callback();
    };
});


App.controller('RootCtrl', ['$scope', '$rootScope', '$location', '$http', '$timeout', '$anchorScroll', '$mdDialog', '$mdMedia', 'authProvider', '$window', function($scope, $rootScope, $location, $http, $timeout, $anchorScroll, $mdDialog, $mdMedia, authProvider, $window) {
    $scope.getHeader = function() {
        var name = $location.url();
        var ctrlName = (name ? name[0].toUpperCase() + name.slice(1) : "main");
        if (ctrlName.indexOf('profile') != -1) return false;
        return 'views/headers/' + name + '.html';
    };
    authProvider.checkAuth(function(data) {
        $scope.user = data;
    });
    $scope.$on('login', function(ev, data) {
        console.log(data);
        $scope.user = data;
        $window.localStorage.setItem('bibi-token', data.auth_key);
    });
    $scope.$on('$locationChangeSuccess', function(event, next, current) {
        $anchorScroll();
    });

    $scope.prevent = function(evt) {
        evt.stopPropagation();
    };
    $scope.openAuth = function() {
        $scope.$broadcast('showAuth');
    };
}]);

App.directive('selectBox', function() {
    return {
        restrict: 'E',
        transclude: false,
        controller: ['$scope', function($scope) {
            $scope.select = function(item) {
                $scope.selectedItem = item;
            };
        }],
        scope: {
            'items': '=items',
            'placeholder': '@placeholder',
            'active': '=show'
        },
        templateUrl: 'views/directives/select-box.html'
    };
});

App.controller('MainCtrl', ['$scope', '$rootScope', '$timeout','authProvider', function($scope, $rootScope, $timeout,authProvider) {
    $scope.$on('showAuth', function() {
        $scope.showAuthorize = true;
    });
    $scope.$on('hideAuth', function() {
        $scope.showAuthorize = false;
    });
    $scope.logout = function() {
        authProvider.logout(function() {
          $scope.user=null;
        })
    };
    $scope.showErrors = function(data) {
        $scope.loginErrors = data;
    };
    $scope.login = function(loginInfo) {
        authProvider.login(loginInfo.username, loginInfo.password, function(data) {
          if (data.statusCode === 200) {
            $scope.showErrors({});
            $scope.$broadcast('hideAuth');
            alert(data.message);
            authProvider.checkAuth(function(data) {
                $scope.$emit('login',data);
            });
          }
          else {
            $scope.showErrors(data.data);
          }
        });
    };
    $scope.hideAuth = function() {
        $scope.showAuthorize = false;
    };
    $scope.marks = [{
        "name": "Alfa Romeo",
        "id": 0
    }, {
        "name": "Aston Martin",
        "id": 1
    }, {
        "name": "Audi",
        "id": 2
    }, {
        "name": "BMW",
        "id": 3
    }, {
        "name": "BYD",
        "id": 4
    }, {
        "name": "Bentley",
        "id": 5
    }, {
        "name": "Cadillac",
        "id": 6
    }, {
        "name": "Changan",
        "id": 7
    }, {
        "name": "Chery",
        "id": 8
    }, {
        "name": "Chevrolet",
        "id": 9
    }, {
        "name": "Chrysler",
        "id": 10
    }, {
        "name": "Citroen",
        "id": 11
    }];
    $scope.workTypes = [{
        "name": "Рехтовка",
        "id": 0
    }, {
        "name": "Балансировка",
        "id": 1
    }, {
        "name": "Электрика",
        "id": 2
    }, {
        "name": "Покраска",
        "id": 3
    }];
    $scope.setSelectedMark = function(mark) {
        $scope.selectedMark = mark;
    };
    $scope.setSelectedWork = function(work) {
        $scope.selectedWork = work;
    };
}]);

App.controller('MeCtrl', ['$scope', '$rootScope', '$timeout', '$routeParams', '$location', function($scope, $rootScope, $timeout, $routeParams, $location) {
    $('input[type=phone]').mask('+7(000) 000-00-00');
    $scope.initMe = function() {

    };
    $scope.getSection = function() {
        var section = $routeParams.section || "main";
        return 'views/sections/me-' + section + '.html'; //?decache='+Math.random();
    };
    $scope.currentSection = function() {
        var current = $routeParams.section || "main";
        return $scope.menu.filter(function(link) {
            return link.href.indexOf(current) != -1;
        })[0];
    };
    $scope.addCompany = function() {
        $location.url('reg');
    };
    $scope.menu = [{
        href: '#/me/main',
        name: 'Редактировать профиль',
        marker: 'images/pointer.svg',
        action: function() {
            $scope.showProfileChange = true;
        }
    }, {
        href: '#/me/password',
        name: 'Изменить пароль',
        marker: 'images/car.svg',
        action: function() {
            $scope.showPasswordChange = true;
        }
    }, {
        href: '#/me/email',
        name: 'Изменить e-mail',
        marker: 'images/calendar.svg',
        action: function() {
            $scope.showMailChange = true;
        }
    }];
}]);

App.controller('ProfileCtrl', ['$scope', '$rootScope', '$timeout', '$routeParams', function($scope, $rootScope, $timeout, $routeParams) {
    $scope.initProfile = function() {
        $('.header.slogan').hide();
        $.get('/data/markBlocks.json')
            .done(function(data) {
                $scope.markBlocks = data;
            });
        $.get('/data/workTypes.json')
            .done(function(data) {
                $scope.workBlocks = data;
            });
        $.get('/data/otherTypes.json')
            .done(function(data) {
                $scope.other = data;
            });
    };
    $scope.logo = 'images/logo.png';
    $scope.status = true;
    $scope.getSection = function() {
        var section = $routeParams.section || "main";
        return 'views/sections/profile-' + section + '.html'; //?decache='+Math.random();
    };
    $scope.isActive = function(href) {
        var address = href.split('/').splice(-1),
            current = $routeParams.section || "main";
        return (address == current ? 'active' : '');
    };
    $scope.menu = [{
        href: '#/profile/main',
        name: 'Профиль',
        marker: 'images/pointer.svg'
    }, {
        href: '#/profile/contacts',
        name: 'Контакты и реквизиты',
        marker: 'images/pointer.svg'
    }, {
        href: '#/profile/vendors',
        name: 'Марки и услуги',
        marker: 'images/car.svg'
    }, {
        href: '#/profile/employees',
        name: 'Сотрудники и график',
        marker: 'images/calendar.svg'
    }, {
        href: '#/profile/photo',
        name: 'Фото и видео',
        marker: 'images/photo.svg'
    }, {
        href: '#/profile/sales',
        name: 'Акции и спецпредложения',
        marker: 'images/actions.svg'
    }, {
        href: '#/profile/settings',
        name: 'Настройки отображения',
        marker: 'images/gears.svg'
    }, ];
    $scope.currentSection = function() {
        var current = $routeParams.section || "contacts";
        return $scope.menu.filter(function(link) {
            return link.href.indexOf(current) != -1;
        })[0];
    };
    $scope.checkBlocks = function(blocks) {
        blocks.forEach(function(i) {
            i.items.forEach(function(j) {
                j.status = !blocks.checked;
            });
        });
    };
    $scope.getChecked = function(block) {
        var count = 0;
        block.items.forEach(function(x) {
            if (x.status) count++;
        });
        return count;
    };
    $scope.checkAll = function(block) {
        var count = 0;
        block.items.forEach(function(x) {
            x.status = !block.checked;
        });
    };
    $scope.countChecked = function(blocks) {
        var count = 0;
        blocks.forEach(function(i) {
            i.items.forEach(function(j) {
                if (j.status) count++;
            });
        });
        return count;
    };
    $scope.countTotal = function(blocks) {
        var count = 0;
        blocks.forEach(function(i) {
            count += i.items.length;
        });
        return count;
    };
}]);

App.controller('RegCtrl', ['$scope', '$rootScope', '$timeout', 'authProvider','$location', function($scope, $rootScope, $timeout, authProvider,$location) {
    $('input[type=phone]').mask('+7(000) 000-00-00');
    $scope.register = function() {
        $scope.newUser.type = 'stoadmin';
        authProvider.register($scope.newUser, function(data) {
            if (data.statusCode === 200) {
              alert(data.message);
              $scope.$emit('login', data.data);
              $timeout(function() {
                  $location.path('me');
              }, 0);
            }
            else {
              alert(data.message);
            }
        });
    };
}]);

App.controller('RegtypeCtrl', ['$scope', '$rootScope', '$timeout', function($scope, $rootScope, $timeout) {

}]);

App.controller('ReguserCtrl', ['$scope', '$location', '$rootScope', '$timeout', 'authProvider', '$window', function($scope, $location, $rootScope, $timeout, authProvider, $window) {
    $('input[type=phone]').mask('+7(000) 000-00-00');
    // $scope.newUser = {
    //     rules_confirm: true,
    //     user_email: "me.at.the.wind@gmail.com",
    //     user_name: "Андрей",
    //     user_password: "Compl3xity",
    //     user_password_repeat: "Compl3xity",
    //     user_patronymic: "Станиславович",
    //     user_phone_number: "79999999999",
    //     user_surname: "Кондауров",
    // };
    $scope.register = function() {
        $scope.newUser.type = 'user';
        authProvider.register($scope.newUser, function(data) {
            if (data.statusCode === 200) {
              $scope.$emit('login', data.data);
              $timeout(function() {
                $location.path('me');
              }, 0);
            }
            else {
              console.log(data);
            }
            // console.log($location.path());
        });
    };
}]);
