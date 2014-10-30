'use strict';

angular.module('Appeteyes.controllers', []);

angular.module('Appeteyes.controllers')

.controller('AppeteyesCtrl', function($scope, Fooder, Yelper, Preferences, $http) {
  
  Preferences.importPreferences(function(newPreferences){
    $scope.cuisines = newPreferences.cuisines;
    $scope.location = newPreferences.location;
    $scope.getPics($scope.cuisines[0], $scope.location, $scope.offset);
  });

  //Local Cache with Response from the Yelp API
  $scope.pics = Fooder.currentPics()||[];
  //Used to Store the current picture
  $scope.food = $scope.pics[0]||''; 
  //Gets information about the current session. If the user already has loaded pictures, it prevents the App from making another Yelp Request
  $scope.isNotLoaded = Fooder.isNotLoaded;
  $scope.like = 'Start Swipin';
  //Offset ensures we don't keep repeating the same pictures or run out of pictures to show
  $scope.offset = 0;

  $scope.sliding = function(direction){
    if(direction === 'left'){
      $scope.mood = '"button-assertive"';
      $scope.hateIt = true;
      $scope.like ='Hate it'; 
    }else if(direction === 'right'){
      $scope.mood = '"button-balanced"';
      $scope.loveIt = true;
      $scope.like ='Love it'; 
    }else{
      $scope.mood = '"button-positive"';
      //Resetting Button Classes
      $scope.loveIt = false;
      $scope.hateIt = false;
      $scope.like = 'Start Swipin';
    }
  } ;

  $scope.firstPic = function(){
    if ($scope.pics.length < 6) {
      $scope.isNotLoaded = true;
      $scope.getPics($scope.cuisines[0], $scope.location, $scope.offset);
    }
    return $scope.pics.shift();
  };

  //Models for Dinamic Classes used on the top-button
  $scope.loveIt = false;
  $scope.hateIt = false;
  //Used to handle the Like and Hate Button
  $scope.changePic = function(input){
    if(input){
      Fooder.addToSelection($scope.food);
      $scope.food = $scope.firstPic();
    }else{
      Fooder.addToDisliked($scope.food);
      $scope.food = $scope.firstPic();
    }
  };

  //Sets up Dinamic Class for the Header  
  $scope.mood = '"button-positive"';

  //Wrapper for the Yelp Interaction
  $scope.getPics = function(category, location, offset){

    if($scope.isNotLoaded){
      var promise = Yelper.search(category, location, offset);
      promise.then(function(data){
        console.log(data);
        $scope.pics = $scope.pics.concat(data.data);
        $scope.changePic();
        Fooder.addPics($scope.pics);
        Fooder.isNotLoaded = false;
        $scope.offset += 20;
        $http({
          method: 'POST',
          url: '/restaurant/info',
          data: data
        })
        .then(function(res){
          console.log(res.status);
        })
        .catch(function(error){
          console.log('$scope.getPics error', error);
        });
      },function(error){
        console.log(error);
      });
    }

  };

  $scope.$on('$locationChangeStart', function(){

    $http({
      method: 'POST',
      url: '/users/likes',
      data: {
        liked: Fooder.getSelected(),
        disliked: Fooder.getDisliked()
      }
    })
    .then(function(res){
      console.log('change user liked pics', res);
    })
    .catch(function(error){
      console.log('error in changing user liked pics', error);
    })
    
  });

});
