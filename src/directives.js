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
