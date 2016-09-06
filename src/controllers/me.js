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
