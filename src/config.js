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
