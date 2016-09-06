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
