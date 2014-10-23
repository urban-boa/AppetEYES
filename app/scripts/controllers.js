'use strict';
angular.module('Appeteyes.controllers', [])

.controller('DashCtrl',function($scope,Fooder,Yelper) {
	//Local Cache with Response from the Yelp API
	$scope.pics = Fooder.currentPics()||[];
	//Used to Store the current picture
	$scope.food =$scope.pics[0]||''; 
	//Gets information about the current session. If the user already has loaded pictures, it prevents the App from making another Yelp Request
	$scope.isNotLoaded = Fooder.isNotLoaded;
	$scope.offset = 0;
	$scope.like = 'Start Swipin';
	$scope.sliding = function(direction){
		if(direction === 'left'){
			$scope.mood = '"button button-block  button-assertive"';
			$scope.like ='Hate it'; 
		}else if(direction === 'right'){
			$scope.mood = '"button button-block button-outline button-balanced"';
			$scope.like ='Love it'; 
		}else{
			// $scope.mood = '"button button-block  button-positive"';
			$scope.like = 'Start Swipin';
		}
	} ;
	$scope.firstPic = function(){
		return $scope.pics.shift();
	};
	//Used to handle the Like and Hate Button
	$scope.changePic = function(input){
		if(input){
			Fooder.addToSelection($scope.food);
			$scope.food = $scope.firstPic();
		}else{
			$scope.food = $scope.firstPic();
		}
	};
	//Sets up Dinamic Class for the Header  
	$scope.mood = '"button button-block button-outline button-positive"';
	//Wrapper for the Yelp Interaction
	$scope.getPics = function(category,location, offset){
		if($scope.isNotLoaded){
			var promise = Yelper.search(category,location, offset);
			promise.then(function(data){
				console.log(data);
				$scope.pics.concat(data.data);
				$scope.changePic();
				Fooder.addPics($scope.pics);
				Fooder.isNotLoaded = false;
				$scope.offset = $scope.offset+20;
			},function(error){
				console.log(error);
			});
		}
	};

	//Sets up default Settings for Category:Food / Location:San Francisco
	$scope.getPics('food','san-francisco',$scope.offset);
	$scope.$watch('pics', function(newVal,oldVal) {
		if ($scope.pics.length<6) {
			$scope.isNotLoaded = true;
			$scope.getPics('food', 'san-francisco',$scope.offset);
		}
	}
})

.controller('FriendsCtrl', function($scope, Fooder) {
  $scope.foods = Fooder.getSelected();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Fooder) {
  $scope.food = Fooder.searchFood($stateParams.name);
  console.log($scope.food);
})

.controller('AccountCtrl', function($scope, Auth) {
	//$scope.user.username and $scope.user.password are being used as ng-models on the template URL tab-account
	$scope.user = {};
	console.log('Form');
	$scope.submitForm = function(){
		//$scope.token = 
		var promise = Auth.login($scope.user);
		promise.then(function(data){
				if(data){
				console.log('User Logged In');
				Auth.setToken(data);
				console.log('This is your token',Auth.getToken(data));
			}else{
				console.log('It doesnt work',Auth.token);
			}
		});
		//if ($scope.token) redirect THIS MIGHT BELONG IN THE FACTORY SINCE WE'RE NOT PASSING IN RES,REQ
	};
	$scope.signUp = function(){
		//$scope.token =
		Auth.signup($scope.user);
		if(Auth.token !== undefined ){
			console.log('User Logged In');
		}else{
			console.log('It doesnt work');
		}
		//if ($scope.token) redirect THIS MIGHT BELONG IN THE FACTORY SINCE WE'RE NOT PASSING IN RES,REQ
	};
	$scope.signOut = function(){
		Auth.signout();
	};

});
