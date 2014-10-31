'use strict';
// angular.module('Appeteyes.controllers', ['famous.angular'])
angular.module('Appeteyes.controllers')

.controller('AccountCtrl', ['$scope', '$famous', function($scope, $famous, Auth, Fooder) {
  //$scope.user.username and $scope.user.password are being used as ng-models on the template URL tab-account
  $scope.user = {
    content: "Change me!"
  };
  console.log('am i here?');

  $scope.submitForm = function(){
    Auth.login($scope.user);
  };

  $scope.signUp = function(){
    Auth.signup($scope.user);
  };

  $scope.signOut = function(){
    Auth.signout();
  };
  $scope.flipIt = function() {
    console.log( "am i in flip?")
    $famous.find('fa-flipper')[0].flip();
  };
  $scope.flipItt = function() {
    console.log( "am i in flip2?")
    $famous.find('fa-flipper')[0].flip();
  };

}]);

// .controller('FlipperCtrl', ['$scope', '$famous', function($scope, $famous) {
    
// }]);


