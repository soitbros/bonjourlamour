app.controller('messageForm', function($scope, $http, $routeParams){

  $scope.sendMessage = function(messageSubject, messageBody) {
    var payload = {};
    payload.messageTo = $routeParams.id;
    payload.messageSubject = messageSubject;
    payload.messageBody = messageBody;
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
