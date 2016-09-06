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
