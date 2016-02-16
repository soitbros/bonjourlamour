app.controller('profileDetail', function($scope, $http, $routeParams){
  // console.log($scope.users);
  $scope.detailProfile = function(){
    $http.get('/auth/users').then(function( response ){
      $scope.users = response.data.users;
      $scope.user = $scope.users[$routeParams.id];
    });
  };

  $scope.detailProfile();

});
