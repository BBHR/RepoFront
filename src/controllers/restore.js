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
