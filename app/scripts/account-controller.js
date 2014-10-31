'use strict';
angular.module('Appeteyes.controllers')

.controller('AccountCtrl', function($scope, Auth, Fooder) {
  //$scope.user.username and $scope.user.password are being used as ng-models on the template URL tab-account
  $scope.user = {
    content: "Change me!"
  };
  // console.log('Form');

  $scope.submitForm = function(){
    Auth.login($scope.user);
  };

  $scope.signUp = function(){
    Auth.signup($scope.user);
  };

  $scope.signOut = function(){
    Auth.signout();
  };

});
