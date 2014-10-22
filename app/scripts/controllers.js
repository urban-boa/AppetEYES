'use strict';
angular.module('Appeteyes.controllers', [])

.controller('DashCtrl', function($scope,Fooder) {
	$scope.food = Fooder.getRandomPic();
	$scope.changePic = function(input){
		if(input){
			Fooder.addToSelection($scope.food);
		}
		$scope.food = Fooder.getRandomPic();
	};

})

.controller('FriendsCtrl', function($scope, Fooder) {
  $scope.foods = Fooder.getSelected();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope, Auth) {
	$scope.user = {};
	$scope.submitForm = function(){
		//$scope.token = 
		Auth.login($scope.user);
		//if ($scope.token) redirect THIS MIGHT BELONG IN THE FACTORY SINCE WE'RE NOT PASSING IN RES,REQ
	}
	$scope.signUp = function(){
		//$scope.token =
		Auth.signup($scope.user);
		//if ($scope.token) redirect THIS MIGHT BELONG IN THE FACTORY SINCE WE'RE NOT PASSING IN RES,REQ
	}
});
