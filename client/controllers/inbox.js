app.controller('inboxCtrl', function($scope, $http) {

  $scope.messages = {};

  $scope.updateInbox = function(){
    $http.get('/auth/messages').then(function( response ){
      $scope.messages = response.data.messages;
      return $http.get('/auth/users');
    }).then(function( response ){
      $scope.users = response.data.users;
      $scope.messages.forEach(function(message){
          message.messageTo = $scope.users.find(function(user){
            return user._id === message.messageTo
          })
          message.messageFrom = $scope.users.find(function(user){
            return user._id === message.messageFrom
          })
      });
    });
  };

  $scope.updateInbox();

});
