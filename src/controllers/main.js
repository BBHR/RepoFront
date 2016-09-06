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
