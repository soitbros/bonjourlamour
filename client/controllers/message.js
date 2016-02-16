app.controller('messageScreen', function($scope, $http, $routeParams){

  $scope.renderMessage = function(){
    $http.get('/auth/messages').then(function( response ){
      $scope.messages = response.data.messages;
      $scope.message = $scope.messages[$routeParams.id];
      return $http.get('/auth/users');
    }).then(function( response ){
      $scope.users = response.data.users;
      $scope.messages.forEach(function(message){
          message.messageFrom = $scope.users.find(function(user){
            return user._id === message.messageFrom;
          })
      });
    });
  };

  $scope.renderMessage();


  $scope.replyMessage = function(messageSubject, messageBody) {
    // create payload
    var payload = {};
    payload.messageTo = $scope.message.messageFrom._id;
    payload.messageSubject = messageSubject;
    payload.messageBody = messageBody;
    console.log(payload);
    // send XHR request
    $http.put('/auth/messages', payload)
      .success(function (data, status) {
        if(status === 200 && data){
          console.log('success');
        } else {
          console.log('handle error');
        }
      })
      .error(function (err) {
        console.log('handle error: ', err);
      });
  };



});
