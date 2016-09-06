var RootController = require('./controllers/root');
var MeController = require('./controllers/me');
var MainController = require('./controllers/main');
var RegController = require('./controllers/reg');
var ReguserController = require('./controllers/reguser');
var ProfileController = require('./controllers/profile');
var RegadminController = require('./controllers/regadmin');
var RegconfirmController = require('./controllers/regconfirm');
var RestoreController = require('./controllers/restore');
var RegtypeController = require('./controllers/regtype');
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
