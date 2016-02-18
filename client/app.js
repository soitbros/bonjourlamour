var app = angular.module('MyApp', ['ngRoute', 'satellizer', 'ngFileUpload']);

app.config(function($routeProvider, $authProvider, $locationProvider) {
  
  $routeProvider
    .when('/', {
      templateUrl: 'partials/welcome.html'
    })
    .when('/home', {
      templateUrl: 'partials/home.html',
      controller: 'profileCtrl'
    })
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'loginCtrl'
    })
    .when('/signup', {
      templateUrl: 'partials/signup.html',
      controller: 'signupCtrl'
    })
    .when('/profile', {
      templateUrl: 'partials/profile.html',
      controller: 'profileCtrl'
    })
    .when('/update', {
      templateUrl: 'partials/update.html',
      controller: 'profileCtrl'
    })
    .when('/upload', {
      templateUrl: 'partials/upload.html',
      controller: 'uploadCtrl'
    })
    .when('/profile/:id', {
      templateUrl: 'partials/detail.html',
      controller: 'profileDetail'
    })
    .when('/inbox', {
      templateUrl: 'partials/inbox.html',
      controller: 'inboxCtrl'
    })
    .when('/messages', {
      templateUrl: 'partials/messages.html',
      controller: 'messageCtrl'
    })
    .when('/message/:id', {
      templateUrl: 'partials/message.html',
      controller: 'messageScreen'
    })
    .when('/messageform/:id', {
      templateUrl: 'partials/messageform.html',
      controller: 'messageForm'
    })
    .otherwise('/');
});
