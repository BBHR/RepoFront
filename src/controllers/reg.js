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
