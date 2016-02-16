app.controller('profileCtrl', function($scope, $rootScope, $http, $window) {

  var currentUser = JSON.parse(localStorage.getItem('currentUser'));

  $scope.users = {};

  $scope.email = currentUser.email;
  $scope.username = currentUser.username;
  $scope.sexuality = currentUser.sexuality;
  $scope.gender = currentUser.gender;
  $scope.age = currentUser.age;
  $scope.image = currentUser.image;
  $scope.pronoun_obj = currentUser.pronoun_obj;
  $scope.pronoun_sub = currentUser.pronoun_sub;
  $scope.pronoun_self = currentUser.pronoun_self;
  $scope.movie = currentUser.movie;
  $scope.book = currentUser.book;
  $scope.music = currentUser.music;
  $scope.tv = currentUser.tv;
  $scope.game = currentUser.game;
  $scope.bio = currentUser.bio;
  $scope.height = currentUser.height;
  $scope.build = currentUser.build;
  $scope.ethnicity = currentUser.ethnicity;
  $scope.astrology = currentUser.astrology;
  $scope.religion = currentUser.religion;
  $scope.income = currentUser.income;
  $scope.looking = currentUser.looking;

  $scope.newEmail = $scope.email;

  $scope.updateUser = function(email, password, username) {
    $scope.message = "";
    // create payload
    var payload = {};
    payload.email = email;
    payload._id = currentUser._id;
    if(password) {
      payload.password = password;
    }
    if(username) {
      payload.username = username;
    }
    console.log(payload);
    // send XHR request
    $http.put('/auth/update', payload)
      .success(function (data, status) {
        if(status === 200 && data){
          delete $window.localStorage.currentUser;
          $window.localStorage.currentUser = JSON.stringify(data);
          $rootScope.currentUser = currentUser;
          console.log(data);
          $scope.email = currentUser.email;
          $scope.message = "Updated!";
          $scope.password = "";
        } else {
          console.log('handle error');
        }
      })
      .error(function (err) {
        console.log('handle error: ', err);
      });
  };

  $scope.updateUsername = function(email, username, sexuality, gender, image, age, pronoun_obj, pronoun_sub, pronoun_self, movie, book, music, tv, game, bio, height, build, ethnicity, astrology, religion, income, looking) {
    $scope.message = "";
    // create payload
    var payload = {};
    payload.email = email;
    payload._id = currentUser._id;
    payload.username = username;
    payload.sexuality = sexuality;
    payload.gender = gender;
    payload.image = image;
    payload.age = age;
    payload.pronoun_obj = pronoun_obj;
    payload.pronoun_sub = pronoun_sub;
    payload.pronoun_self = pronoun_self;
    payload.movie = movie;
    payload.book = book;
    payload.music = music;
    payload.tv = tv;
    payload.game = game;
    payload.bio = bio;
    payload.height = height;
    payload.build = build;
    payload.ethnicity = ethnicity;
    payload.astrology = astrology;
    payload.religion = religion;
    payload.income = income;
    payload.looking = looking;
    console.log(payload);
    // send XHR request
    $http.put('/auth/update', payload)
      .success(function (data, status) {
        if(status === 200 && data){
          delete $window.localStorage.currentUser;
          $window.localStorage.currentUser = JSON.stringify(data);
          $rootScope.currentUser = currentUser;
          console.log(data);
          $scope.email = currentUser.email;
          $scope.message = "Updated!";
          $scope.username = currentUser.username;
          $scope.sexuality = currentUser.sexuality;
          $scope.gender = currentUser.gender;
          $scope.image = currentUser.image;
          $scope.age = currentUser.age;
          $scope.image = currentUser.image;
          $scope.pronoun_obj = currentUser.pronoun_obj;
          $scope.pronoun_sub = currentUser.pronoun_sub;
          $scope.pronoun_self = currentUser.pronoun_self;
          $scope.movie = currentUser.movie;
          $scope.book = currentUser.book;
          $scope.music = currentUser.music;
          $scope.tv = currentUser.tv;
          $scope.game = currentUser.game;
          $scope.bio = currentUser.bio;
          $scope.height = currentUser.height;
          $scope.build = currentUser.build;
          $scope.ethnicity = currentUser.ethnicity;
          $scope.astrology = currentUser.astrology;
          $scope.religion = currentUser.religion;
          $scope.income = currentUser.income;
          $scope.looking = currentUser.looking;
        } else {
          console.log('handle error');
        }
      })
      .error(function (err) {
        console.log('handle error: ', err);
      });
  };

  $scope.updateProfiles = function(){
    $http.get('/auth/users').then(function( response ){
      $scope.users = response.data.users;
    });
  };


  $scope.updateProfiles();

});
