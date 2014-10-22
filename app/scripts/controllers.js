'use strict';
angular.module('Appeteyes.controllers', [])

.controller('DashCtrl',function($scope,Fooder,Yelper) {
	//Local Cache with Response from the Yelp API
	$scope.pics = [];
	//Used to Store the current picture
	$scope.food =''; 
	$scope.getRandomPic = function(){
      var randomizer = Math.floor(Math.random() * ($scope.pics.length - 1));
      return $scope.pics[randomizer];
	};
	$scope.changePic = function(input){
		if(input){
			Fooder.addToSelection($scope.food);
			$scope.food = $scope.getRandomPic();
		}else{
			$scope.food = $scope.getRandomPic();
		}
	};
	$scope.getPics = function(category,location){
		var promise = Yelper.search(category,location);
		promise.then(function(data){
			console.log(data);
			$scope.pics = data.data;
			$scope.changePic();
		},function(error){
			console.log(error);
		});
	};
	//Sets up default Settings for Category:Food / Location:San Francisco
	$scope.getPics('food','san-francisco');
})

.controller('FriendsCtrl', function($scope, Fooder) {
  $scope.foods = Fooder.getSelected();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Fooder) {
  $scope.food = Fooder.searchFood($stateParams.name);
  console.log($scope.food);
})

.controller('AccountCtrl', function($scope) {
});
