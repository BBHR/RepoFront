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
