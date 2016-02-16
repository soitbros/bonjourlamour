app.controller('navbarCtrl', function($scope, $window, $auth, $location) {

  $scope.username = JSON.parse(localStorage.getItem('currentUser')).username;

  $scope.isAuthenticated = function() {
    return $auth.isAuthenticated();
  };

  $scope.logout = function() {
    $auth.logout();
    delete $window.localStorage.currentUser;
    $location.path('/');
  };

});
