/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var App = angular.module('BiBiApp', ['ngRoute', 'ngAnimate', 'ngMaterial', 'ngMessages']);
	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(14);


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = angular.module('BiBiApp').config(['$routeProvider', '$httpProvider', '$compileProvider','$locationProvider', function($routeProvider, $httpProvider, $compileProvider,$locationProvider) {
	    $httpProvider.interceptors.push('authInterceptor');
	    $compileProvider.debugInfoEnabled(false);
	    var dirs = [
	        'main', 'profile', 'me','restore'
	    ];
	    var emptyDirs = [
	      'news','vacancy','about','addcompany'
	    ];
	    dirs.forEach(function(name) {
	        var ctrlName = name[0].toUpperCase() + name.slice(1);
	        $routeProvider.when('/' + name, {
	            templateUrl: 'views/' + name + '.html',
	            controller: ctrlName + 'Ctrl as ctrl'
	        });
	    });
	    emptyDirs.forEach(function(name) {
	      $routeProvider.when('/' + name, {
	          templateUrl: 'views/news.html',
	          controller: 'EmptyCtrl as ctrl'
	      });
	    });
	    $routeProvider.when('/registration', {
	        templateUrl: 'views/regtype.html',
	        controller: 'RegtypeCtrl as ctrl'
	    });
	    $routeProvider.when('/addcompanytest', {
	        templateUrl: 'views/addcompany.html',
	        controller: 'AddcompanyCtrl as ctrl'
	    });
	    $routeProvider.when('/registration/STO', {
	        templateUrl: 'views/registration.html',
	        controller: 'RegistrationCtrl as ctrl'
	    });
	    $routeProvider.when('/registration/user', {
	        templateUrl: 'views/reguser.html',
	        controller: 'ReguserCtrl as ctrl'
	    });
	    $routeProvider.when('/profile/:section', {
	        templateUrl: 'views/profile.html',
	        controller: 'ProfileCtrl as ctrl'
	    });
	    $routeProvider.when('/me/:section', {
	        templateUrl: 'views/me.html',
	        controller: 'MeCtrl as ctrl'
	    });
	    $routeProvider.when('/', {
	        templateUrl: 'views/main.html',
	        controller: 'MainCtrl as ctrl'
	    });
	    $routeProvider.when('/regconfirm/:key', {
	        templateUrl: 'views/regconfirm.html',
	        controller: 'RegconfirmCtrl as ctrl'
	    });
	    $routeProvider.otherwise({
	        redirectTo: '/'
	    });
	    // $locationProvider.html5Mode(true);
	}]);


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var RootController = __webpack_require__(4);
	var MeController = __webpack_require__(5);
	var MainController = __webpack_require__(6);
	var RegController = __webpack_require__(7);
	var ReguserController = __webpack_require__(8);
	var ProfileController = __webpack_require__(9);
	var RegadminController = __webpack_require__(10);
	var RegconfirmController = __webpack_require__(11);
	var RestoreController = __webpack_require__(12);
	var RegtypeController = __webpack_require__(13);
	module.exports = angular.module('BiBiApp')
	.controller('RootCtrl', ['$scope', '$rootScope', '$location', '$http', '$timeout', '$anchorScroll', '$mdDialog', '$mdMedia', 'authProvider', '$window', RootController])
	.controller('MainCtrl', ['$scope', '$rootScope','$http', '$timeout','authProvider', MainController])
	.controller('MeCtrl', ['$scope', '$rootScope', '$timeout', '$routeParams', '$location', MeController])
	.controller('ProfileCtrl', ['$scope', '$rootScope', '$timeout', '$routeParams', ProfileController])
	.controller('RegistrationCtrl', ['$scope', '$rootScope', '$timeout', 'authProvider','$location', RegController])
	.controller('RegtypeCtrl', ['$scope',RegtypeController])
	.controller('EmptyCtrl',function(){})
	.controller('AddcompanyCtrl',function(){})
	.controller('RestoreCtrl', ['$scope','$http','$location',RestoreController])
	.controller('RegconfirmCtrl', ['authProvider', '$scope', '$routeParams','$location','$http','$timeout', RegconfirmController])
	.controller('RegadminCtrl', [RegadminController])
	.controller('ReguserCtrl', ['$scope', '$location', '$rootScope', '$timeout', 'authProvider', '$window', ReguserController]);


/***/ },
/* 4 */
/***/ function(module, exports) {

	var controller = function($scope, $rootScope, $location, $http, $timeout, $anchorScroll, $mdDialog, $mdMedia, authProvider, $window) {
	  var self = this;

	      self.clv = false;
	      $(document).bind('click', function(event){
	        var node = event.target;
	        var cityList = $('.c-dropdown-list')[0];
	        var marker = false;

	        while (node !== null) {
	          var check = [].filter.call(angular.element(cityList).children(),function(item) {return item == node;}  );
	          if (check.length > 0) {
	            node = null;
	            marker = true;
	          }
	          if (node)
	            node = node.parentNode;
	        }
	        if (!marker)
	          $scope.$apply(function(){
	            self.clv = false;
	          })

	    });
	    this.cities = ['Новосибирск','Самара','Волгоград','Москва'];
	    this.choose = function(city) {
	      self.chosenCity = city;
	    }
	    this.toggleclv = function() {
	      self.clv = !self.clv;
	    };
	    this.check = function(fields) {
	      fields = fields || ['username','password'];
	      var user = self.loginInfo;
	      var errors = {};
	      if (fields.indexOf('username') >= 0) {
	        if (user.username.length === 0) {
	          if (!errors.username) errors.username = [];
	          errors.username.push('Пожалуйста, введите адрес электронной почты');
	        }
	        else if (!/^[\w\d\.\-\_\!\@\#\$\%]+@[\w\d\.]+$/.test(user.username)) {
	          if (!errors.username) errors.username = [];
	          errors.username.push('Неверное значение')
	        }
	      }
	      if (fields.indexOf('password') >= 0) {
	        if(/[^\w\d\`\~\!\№\@\#\$\%\^\&\*\(\)\_\-\+\=\{\}\[\]\\\|\:\;\"\'\<\>\,\.\?\/]+/.test(user.password)) {
	          if (!errors.user_password) errors.user_password = [];
	          errors.user_password.push('Пароль содержит недопустимые символы');
	        }
	        else if(!user.password || user.password.length === 0) {
	          if (!errors.password) errors.password = [];
	          errors.password.push('Пожалуйста, введите пароль');
	        }
	        else if(user.password && user.password.length < 8) {
	          if (!errors.password) errors.password = [];
	          errors.password.push('Укажите не менее 8 символов');
	        }
	        else if(user.password && user.password.length >255) {
	          if (!errors.password) errors.password = [];
	          errors.password.push('Пароль слишком длинный');
	        }
	      }
	      return (Object.keys(errors).length > 0 ? errors : false);
	    }
	    this.validate = function(fields) {
	      fields = fields || null;
	      var errors = self.check(fields)
	      if (errors) {
	        if (!fields) {
	          var index = Object.keys(errors);
	          $('input[name='+index[0]+']').focus();
	        }
	        self.showErrors(errors);
	        return false;
	      }
	      self.showErrors({});
	      return true;
	    }



	    this.showAuthorize = false;
	    self.loginInfo = {
	      username : '',
	      password : ''
	    };
	    $scope.$on('hideAuth',function(ev,data){
	      self.hideAuth();
	    });
	    $scope.$on('modal',function(ev,text,callback) {
	      self.unhandled(text);
	      callback && callback();
	    });
	    this.getHeader = function() {
	        var path = $location.url().split('/');
	        var name = path[1];
	        var ctrlName = (name ? name[0].toUpperCase() + name.slice(1) : "main");

	        if (ctrlName.indexOf('profile') != -1) return false;
	        return 'views/headers/' + (name ? name : 'main') + '.html';
	    };
	    this.unhandled = function(text) {
	      this.unhandledText = text || "Здравствуйте! Мы работаем над реализацией этой функции. Совсем скоро она станет доступна!";
	      this.showUnhandled = !this.showUnhandled;
	    };
	    $scope.user = null;
	    authProvider.checkAuth(function(data) {
	        $scope.user = data;
	        if ($location.path().indexOf('reg') >=0 && $location.path().indexof('refconfirm') === -1) {
	          $location.path('/').replace();
	        }
	    });
	    $scope.$on('getUser',function(evt,data) {
	      authProvider.checkAuth(function(data) {
	          $scope.user = data;
	      });
	    });

	    $timeout(function(){
	      $scope.blurWhiteScreen = true;
	      $scope.loadComplete = true;
	    },300);
	    this.logout = function() {
	        authProvider.logout(function() {
	          $scope.user=null;
	        })
	    };
	    this.showErrors = function(data) {
	        if (data.password&&data.password[0].toLowerCase().indexOf('incorrect') >= 0) {
	          data.password[0] = "Неправильно указано имя пользователя или пароль";
	        }
	        self.loginErrors = data;
	        if (Object.keys(data).length > 0) {
	          $timeout(function(){
	            self.loginErrors = {};
	          },5000);
	        }
	    };
	    this.login = function(loginInfo) {
	        self.showErrors({});


	        if(!self.validate()) return false;
	        authProvider.login(self.loginInfo.username, self.loginInfo.password, function(data) {
	          if (data.statusCode === 200) {
	            self.hideAuth();
	            authProvider.checkAuth(function(data) {
	              $scope.user = data;
	            });
	          }
	          else {
	            self.showErrors(data.data);
	          }
	        });
	    };
	    $scope.$on('$locationChangeSuccess', function(event, next, current) {
	        $anchorScroll();
	    });
	    this.logout = function() {
	        authProvider.logout(function(){
	          $timeout(function(){
	            $scope.user = null;
	            $location.path('main').replace();
	          },10);
	        });
	    };
	    $scope.prevent = function(evt) {
	        evt.stopPropagation();
	    };
	    this.openAuth = function() {
	        this.showAuthorize = true
	    };
	    this.hideAuth = function() {
	      this.showAuthorize = false;
	    }
	};
	module.exports = controller;


/***/ },
/* 5 */
/***/ function(module, exports) {

	var controller = function($scope, $rootScope, $timeout, $routeParams, $location) {
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
	        $location.url('addcompany');
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
	};
	module.exports = controller;


/***/ },
/* 6 */
/***/ function(module, exports) {

	var controller = function($scope, $rootScope, $http, $timeout,authProvider) {
	  var self = this;
	    $scope.selectedMark = '';
	    $scope.selectedWork = '';
	    $scope.marks = [];
	    $scope.workTypes = [];
	    $http({
	      method: 'POST',
	      url: '/back/web/data/index',
	    })
	    .then(function(response){

	      if (response.status === 200) {
	        var data = response.data;
	        $scope.marks = data.brands.map(function(item) {
	          return {
	            id : item.id,
	            name: item.auto_brand_name,
	            origin: item.auto_brand_origin
	          }
	        });
	        $scope.workTypes = data.works.map(function(item) {
	          return {
	            id : item.id,
	            name: item.auto_work_name,
	            group: item.auto_work_group
	          }
	        });
	      }
	      else {

	      }
	    })
	    // $scope.marks = [{
	    //     "name": "Alfa Romeo",
	    //     "id": 0
	    // }, {
	    //     "name": "Aston Martin",
	    //     "id": 1
	    // }, {
	    //     "name": "Audi",
	    //     "id": 2
	    // }, {
	    //     "name": "BMW",
	    //     "id": 3
	    // }, {
	    //     "name": "BYD",
	    //     "id": 4
	    // }, {
	    //     "name": "Bentley",
	    //     "id": 5
	    // }, {
	    //     "name": "Cadillac",
	    //     "id": 6
	    // }, {
	    //     "name": "Changan",
	    //     "id": 7
	    // }, {
	    //     "name": "Chery",
	    //     "id": 8
	    // }, {
	    //     "name": "Chevrolet",
	    //     "id": 9
	    // }, {
	    //     "name": "Chrysler",
	    //     "id": 10
	    // }, {
	    //     "name": "Citroen",
	    //     "id": 11
	    // }];
	    // $scope.workTypes = [{
	    //     "name": "Рехтовка",
	    //     "id": 0
	    // }, {
	    //     "name": "Балансировка",
	    //     "id": 1
	    // }, {
	    //     "name": "Электрика",
	    //     "id": 2
	    // }, {
	    //     "name": "Покраска",
	    //     "id": 3
	    // }];
	    // $scope.setSelectedMark = function(mark) {
	    //     $scope.selectedMark = mark;
	    // };
	    // $scope.setSelectedWork = function(work) {
	    //     $scope.selectedWork = work;
	    // };
	};
	module.exports = controller;


/***/ },
/* 7 */
/***/ function(module, exports) {

	var controller = function($scope, $rootScope, $timeout, authProvider,$location) {
	    var self = this;
	    $scope.$emit('hideAuth');
	    $scope.newUser ={
	      user_name : '',
	      user_surname: '',
	      user_patronymic: '',
	      user_email: '',
	      user_phone_number: '',
	      user_password: '',
	      user_password_repeat: ''
	    };
	    $('input[type=phone]').mask('+7(000) 000-00-00');
	    this.setErrors = function(errors) {
	      if (errors.user_email && errors.user_email[0].indexOf('уже занято') >= 0 ) {
	        errors.user_email[0] = "Пользователь с таким адресом электронной почты уже зарегистрирован";
	      }
	      this.regErrors = errors;
	      if (Object.keys(errors).length > 0) {
	        $timeout(function(){
	          self.regErrors = {};
	        },5000);
	      }
	    }
	    this.check = function(fields) {
	      fields = fields || ['user_surname','user_name','user_patronymic','user_email','user_phone_number','user_password','user_password_repeat','rules_confirm'];
	      var user = $scope.newUser;
	      var errors = {};


	      if (fields.indexOf('user_surname') >= 0) {
	        if (!/^[А-Яа-я-`]+$/.test(user.user_surname)) {
	          if (!errors.user_surname) errors.user_surname = [];
	          errors.user_surname.push('Используйте символы русского алфавита, а также символы - и ‘')
	        }
	        // if(!user.user_surname || user.user_surname.length === 0 ) {
	        //   if (!errors.user_surname) errors.user_surname = [];
	        //   errors.user_surname.push('Обязательно для заполнения')
	        // }
	      }
	      if (fields.indexOf('user_name') >= 0) {
	        console.log(user.user_name);
	        if (!/^[А-Яа-я-`]+$/.test(user.user_name)) {
	          if (!errors.user_name) errors.user_name = [];
	          errors.user_name.push('Используйте символы русского алфавита, а также символы - и ‘')
	        }
	        // if(!user.user_name || user.user_name.length === 0 ) {
	        //   if (!errors.user_name) errors.user_name = [];
	        //   errors.user_name.push('Обязательно для заполнения')
	        // }
	      }
	      if (fields.indexOf('user_patronymic') >= 0) {
	        if (!/^[А-Яа-я-`]*$/.test(user.user_patronymic)) {
	          if (!errors.user_patronymic) errors.user_patronymic = [];
	          errors.user_patronymic.push('Используйте символы русского алфавита, а также символы - и ‘')
	        }
	      }
	      if (fields.indexOf('user_phone_number') >= 0) {
	        if (user.user_phone_number && user.user_phone_number.replace(/[^\d]/g,'').length < 11) {
	          if (!errors.user_phone_number) errors.user_phone_number = [];
	          errors.user_phone_number.push('Укажите номер телефона в 10-значном формате: (000)-000-00-00')
	        }
	      }
	      if (fields.indexOf('user_email') >= 0) {
	        if (!/^[\w\d\.\-\_\!\@\#\$\%]+@[\w\d\.]+$/.test(user.user_email)) {
	          if (!errors.user_email) errors.user_email = [];
	          errors.user_email.push('Неверное значение')
	        }
	      }
	      if (fields.indexOf('user_password') >= 0) {
	        if(/[^А-Яа-яA-Za-z\d\`\~\!\№\@\#\$\%\^\&\*\(\)\_\-\+\=\{\}\[\]\\\|\:\;\"\'\<\>\,\.\?\/]+/.test(user.user_password)) {
	          if (!errors.user_password) errors.user_password = [];
	          errors.user_password.push('Содержит недопустимые символы');
	        }
	        else if(!user.user_password || user.user_password.length < 8) {
	          if (!errors.user_password) errors.user_password = [];
	          errors.user_password.push('Укажите не менее 8 символов');
	        }
	        else if(user.user_password && user.user_password.length >255) {
	          if (!errors.user_password) errors.user_password = [];
	          errors.user_password.push('Пароль слишком длинный');
	        }
	      }
	      if (fields.indexOf('user_password_repeat') >= 0) {
	        if(/[^А-Яа-яA-Za-z\d\`\~\!\№\@\#\$\%\^\&\*\(\)\_\-\+\=\{\}\[\]\\\|\:\;\"\'\<\>\,\.\?\/]+/g.test(user.user_password_repeat)) {
	          if (!errors.user_password_repeat) errors.user_password_repeat = [];
	          errors.user_password_repeat.push('Содержит недопустимые символы');
	        }
	        else {
	          if(user.user_password!==user.user_password_repeat) {
	            if (!errors.user_password_repeat) errors.user_password_repeat = [];
	            errors.user_password_repeat.push('Пароли не совпадают');
	          }
	        }
	      }
	      if (fields.indexOf('rules_confirm') >= 0) {
	        if (!$scope.newUser.rules_confirm) {
	          if (!errors.rules_confirm) errors.rules_confirm = [];
	          errors.rules_confirm.push('Подтвердите согласие с правилами');
	        }
	      }
	      return (Object.keys(errors).length > 0 ? errors : false);
	    }
	    this.validate = function(fields) {
	      fields = fields || null;
	      var errors = self.check(fields)
	      if (errors) {
	        if (!fields) {
	          var index = Object.keys(errors);
	          $('input[name='+index[0]+']').focus();
	        }
	        self.setErrors(errors);
	        return false;
	      }
	      self.setErrors({});
	      return true;
	    }
	    this.register = function() {
	        $scope.newUser.type = 'stoadmin';
	        if (!self.validate()) return false;
	        authProvider.register($scope.newUser, function(data) {
	            if (parseInt(data.statusCode) === 200) {
	              $scope.newUser = {
	                user_name : '',
	                user_surname: '',
	                user_patronymic: '',
	                user_email: '',
	                user_phone_number: '',
	                user_password: '',
	                user_password_repeat: ''
	              };
	              $scope.$emit('modal',data.message);
	              $location.path('main').replace();
	            }
	            else {
	              self.setErrors(data.errors);
	            }
	        });
	    };
	};
	module.exports = controller;


/***/ },
/* 8 */
/***/ function(module, exports) {

	var controller = function($scope, $location, $rootScope, $timeout, authProvider, $window) {
	    $('input[type=phone]').mask('+7(000) 000-00-00');

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
	        });
	    };
	};
	module.exports = controller;


/***/ },
/* 9 */
/***/ function(module, exports) {

	var controller = function($scope, $rootScope, $timeout, $routeParams) {
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
	};
	module.exports = controller;


/***/ },
/* 10 */
/***/ function(module, exports) {

	var controller = function() {

	};
	module.exports = controller;


/***/ },
/* 11 */
/***/ function(module, exports) {

	var controller = function(authProvider,$scope,$routeParams,$location,$http,$timeout) {
	  var auth_key = $routeParams.key;
	  var request = {
	      method: 'POST',
	      url: '/back/web/auth/confirm',
	      data: JSON.stringify({
	          key: auth_key
	      })
	  };
	  console.log($('.confirm-success').hide());
	  console.log($('.confirm-error').hide());
	  $http(request)
	      .then(function(response) {
	          if (parseInt(response.data.statusCode) === 200) {
	              window.localStorage.setItem('bibi-token', response.data.data);
	              $('.confirm-success').fadeIn(300);
	              $scope.$emit('getUser');
	              $timeout(function(){
	                $location.path('me').replace();
	              },5000);
	          } else {
	              $('.confirm-error').fadeIn(300);
	          }
	      });
	};
	module.exports = controller;


/***/ },
/* 12 */
/***/ function(module, exports) {

	var controller = function($scope,$http,$location) {
	  var self = this;
	  $scope.$emit('hideAuth');
	  this.email = '';
	  this.errors = {};
	  this.restore = function() {
	    if(!self.validate('email')) {
	      return false;
	    }
	    var request = {
	        method: 'POST',
	        url: '/back/web/auth/restore',
	        data: JSON.stringify({
	            email: self.email
	        })
	    };
	    $http(request)
	        .then(function(response) {
	          if (response.data.statusCode === 200) {
	            $scope.$emit('modal',response.data.message,function(){
	              $location.path('main').replace();
	            });
	          }
	          else {
	            if (response.data.message.indexOf('не зарегистрирован') >= 0) {
	              self.setErrors({user_email:["Пользователя с таким адресом электронной почты не зарегистрировано"]});
	            }
	          }
	        });
	  };
	  this.setErrors = function(errors) {
	    self.errors = errors;
	    window.setTimeout(function() {
	      self.errors = {};
	    },3000);
	  }
	  this.check = function(fields) {
	    fields = fields || ['email'];
	    var errors = {};
	    if (fields.indexOf('email') >= 0) {
	      if (!/^[\w\d\.\-\_\!\@\#\$\%]+@[\w\d\.]+$/.test(this.email)) {
	        if (!errors.user_email) errors.user_email = [];
	        errors.user_email.push('Пожалуйста введите адрес почты')
	      }
	      else if (!/^[\w\d\.\-\_\!\@\#\$\%]+@[\w\d\.]+$/.test(this.email)) {
	        if (!errors.user_email) errors.user_email = [];
	        errors.user_email.push('Введён неверный адрес почты')
	      }
	    }
	    return (Object.keys(errors).length > 0 ? errors : false);
	  }

	  this.validate = function(fields) {
	    fields = fields || null;
	    var errors = self.check(fields)
	    if (errors) {
	      if (!fields) {
	        var index = Object.keys(errors);
	        $('input[name='+index[0]+']').focus();
	      }
	      self.setErrors(errors);
	      return false;
	    }
	    self.setErrors({});
	    return true;
	  }

	};
	module.exports = controller;


/***/ },
/* 13 */
/***/ function(module, exports) {

	var controller = function($scope) {
	  $scope.$emit('hideAuth');
	};
	module.exports = controller;


/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = angular.module('BiBiApp').directive('selectBox', function($rootScope) {
	    return {
	        restrict: 'E',
	        transclude: false,
	        controller: ['$rootScope','$scope','$document', function($rootScope,$scope,$document) {
	          var self = this;
	          $scope.filterText = "";
	            $scope.select = function(item) {
	                $scope.selectedItem = item;
	                $scope.filterText = "";
	                $scope.bind = item.name;
	                $scope.filterCategories();
	                $scope.hideDropDown();
	            };
	            // $rootScope.$on("documentClicked", function(inner, target) {
	      			// 	console.log(inner,target);
	      			// });

	            $scope.self = '';
	            $scope.showDropDown = function() {
	              $scope.dd = true;
	              window.setTimeout(function () {
	                $($scope.self).find('input').focus();
	              }, 100);
	            };
	            $scope.canShow = function() {
	              if ($scope.categories) {
	                return Object.keys($scope.getCategories()).length > 0;
	              }
	              else {
	                return Object.keys($scope.getItems()).length > 0;
	              }
	            }
	            $scope.hideDropDown = function() {
	              $scope.dd = false;
	            };
	            $scope.toggleDropDown = function() {
	              if ($scope.dd) {
	                $scope.hideDropDown();
	              }
	              else {
	                $scope.showDropDown();
	              }
	            }
	            self.categorize = function() {
	              self.categories = {};
	              self.items = angular.copy($scope.items.filter(function(item) {
	                return item.name.toLowerCase().indexOf($scope.filterText.toLowerCase()) >= 0
	              }));
	              self.items = self.items.map(function(item) {
	                return {
	                  category : item.name[0].toUpperCase(),
	                  id : item.id,
	                  name: item.name
	                };
	              });
	              self.items.forEach(function(item) {
	                if (!self.categories[item.category]) {
	                  self.categories[item.category] = [];
	                }
	                self.categories[item.category].push(item);
	              });
	              [].sort.call(self.categories);
	            }
	            $scope.filterCategories = function() {
	                if ($scope.categories) self.categorize();
	            };
	            if ($scope.categories) {
	              $scope.$watch('items',function(oldVal, newVal){
	                self.categorize();
	              });
	            }
	            $scope.getItems = function() {
	              return $scope.items.filter(function(item) {
	                return item.name.toLowerCase().indexOf($scope.filterText.toLowerCase()) >= 0;
	              });
	            }
	            $scope.getCategories = function() {
	                // var items = $scope.items.filter(function(item) {
	                //   return item.name.toLowerCase().indexOf($scope.filterText.toLowerCase()) >= 0
	                // });
	                // var categories = {};
	                // items.forEach(function(item) {
	                //   var letter = item.name.toUpperCase()[0];
	                //   if (!categories[letter]) categories[letter] = [];
	                //   categories[letter].push(item);
	                // });
	                return self.categories;
	            };
	        }],
	        scope: {
	            'items': '=items',
	            'placeholder': '@placeholder',
	            'active': '=show',
	            'bind': '=',
	            'categories': '=categories'
	        },
	        templateUrl: 'views/directives/select-box.html',
	        link : function(scope,element,attrs) {
	          scope.self = element[0];
	          $(document).bind('click', function(event){
	            var node = event.target;
	            var marker = false;
	            while (node !== null) {
	              var toCheck = angular.element(element[0]).children();
	              toCheck.push(element[0]);
	              var check = [].filter.call(toCheck,function(item) {return item == node;}  );
	              if (check.length > 0) {
	                marker = true;
	                node = null;
	                continue;
	              }
	              node = node.parentNode;
	            };
	            scope.$apply(function(){
	              if (!marker&&scope.dd) {
	                scope.dd=false;
	              }
	            })

	        });
	        }
	    };
	});


/***/ }
/******/ ]);