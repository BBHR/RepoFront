var controller = function(authProvider,$scope,$routeParams,$location,$http,$timeout) {
  var auth_key = $routeParams.key;
  var request = {
      method: 'POST',
      url: '/back/web/auth/confirm',
      data: JSON.stringify({
          key: auth_key
      })
  };
  console.log($('.confirm-success').hide());
  console.log($('.confirm-error').hide());
  $http(request)
      .then(function(response) {
          if (parseInt(response.data.statusCode) === 200) {
              window.localStorage.setItem('bibi-token', response.data.data);
              $('.confirm-success').fadeIn(300);
              $scope.$emit('getUser');
              $timeout(function(){
                $location.path('me').replace();
              },5000);
          } else {
              $('.confirm-error').fadeIn(300);
          }
      });
};
module.exports = controller;
