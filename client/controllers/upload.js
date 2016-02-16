app.controller('uploadCtrl', ['$scope', 'Upload', function ($scope, Upload) {

  $scope.image = JSON.parse(localStorage.getItem('currentUser')).image;
  $scope.email = JSON.parse(localStorage.getItem('currentUser')).email;
  $scope._id = JSON.parse(localStorage.getItem('currentUser'))._id;

    // upload later on form submit or something similar
  $scope.submit = function() {
    if ($scope.form.image.$valid && $scope.image) {
      $scope.upload($scope.email, $scope.image, $scope._id);
      console.log($scope.email, $scope.image, $scope._id);
    }
  };

    // // upload on file select or drop
  $scope.upload = function (email, image, _id) {
      Upload.upload({
          url: 'auth/update',
          method: 'PUT',
          data: {email: email, image: image.$ngfDataUrl, _id: _id}
      }).then(function (resp) {
          console.log('Success ' + resp.config.data.image.name + 'uploaded. Response: ' + resp.data);
      }, function (resp) {
          console.log('Error status: ' + resp.status);
      }, function (evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          console.log('progress: ' + progressPercentage + '% ' + evt.config.data.image.name);
      });
  };

}]);
