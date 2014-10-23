'use strict';
angular.module('Appeteyes.controllers', [])

.controller('DashCtrl', function($scope, Fooder) {
	$scope.food = Fooder.getRandomPic();
	$scope.changePic = function(input){
		if(input){
			Fooder.addToSelection($scope.food);
			$scope.food = Fooder.getRandomPic();
		}else{
			$scope.food = Fooder.getRandomPic();
		}
	};

})

.controller('FriendsCtrl', function($scope, Fooder) {
  $scope.foods = Fooder.getSelected();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
})

.controller('PreferencesCtrl', function($scope, Preferences) {

  //an object that holds the state of what is currently selected
  $scope.selectedOption = {
    'Location': {},
    'Cuisines': {}
  };

  $scope.importUserPreferences = function(token){
    //uncommenting when importing from factory/server works
    //$scope.userPreferences = Preferences.importPreferences('abc');

    //remove once importing from factory/server works
    $scope.userPreferences = {
      token: 56,
      cuisines: ['Thai', 'American', 'Japanese'],
      location: 'San Francisco',
    };

    //pre-select options from imported preferences
    //set the imported cuisines
    for (var i=0; i<$scope.userPreferences.cuisines.length; i++){
     $scope.selectedOption.Cuisines[$scope.userPreferences.cuisines[i]] = $scope.userPreferences.cuisines[i];
    }
    
    //set the imported location
    if($scope.userPreferences.location === 'GPS'){
      $scope.selectedOption.Location['Use GPS'] = 'Use GPS';
      $scope.locationInput = '';
    } else {
      $scope.selectedOption.Location['Enter City'] = 'Enter City';
      $scope.locationInput = $scope.userPreferences.location;
    }
  };
  $scope.importUserPreferences('abc');

  //an array of objects that populates the preferences tab
  $scope.preferencesList = [
    { name: 'Location',
      options: ['Use GPS', 'Enter City']
    },
    { name: 'Cuisines',
      options: Preferences.listCuisines()
    }
  ];

  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggle = function(preference) {
    if ($scope.isExpanded(preference)) {
      $scope.expandedOption = null;
    } else {
      $scope.expandedOption = preference;
    }
  };

  //run when a user preference is clicked upon
  //sets a specific preference as 'selected' or 'not selected' as necessary
  $scope.select = function(preference, option){
    if (preference.name === 'Cuisines'){
      if ($scope.isSelected(preference, option)){
        delete $scope.selectedOption[preference.name][option];
      } else {
        $scope.selectedOption[preference.name][option] = option;
      }
    }
    else if (preference.name === 'Location'){
      if (option === 'Use GPS'){
        //$scope.getGpsLocation();
        delete $scope.selectedOption[preference.name]['Enter City'];
        $scope.selectedOption[preference.name][option] = option;
        $scope.addCity('GPS');
      } else {
        delete $scope.selectedOption[preference.name]['Use GPS'];
        $scope.selectedOption[preference.name][option] = option;
      }
    }
  };

  //returns boolean based on if preference set is currently expanded
  $scope.isExpanded = function(preference) {
    return $scope.expandedOption === preference;
  };

  //returns boolean based on if a preference's option is currently selected
  $scope.isSelected = function(preference, option) {
    return $scope.selectedOption[preference.name][option] === option;
  };

  //returns boolean if the option in the ng-list is city so form/input can be shown
  $scope.isCity = function(preference, option){
    return (option === 'Enter City' && $scope.isSelected(preference, option));
  };

  $scope.addCity = function(locationInput){
    $scope.userPreferences.location = locationInput;
    console.log('changed');
  };
	
	// //when "save settings" button is clicked update new settings and send to factory
	// //which will in turn send to server
	$scope.saveTheSettings = function(){
    //populate userPreferences object with selected cuisine options
    $scope.userPreferences.cuisines = [];
    for (var key in $scope.selectedOption.Cuisines){
      $scope.userPreferences.cuisines.push(key);
    }
    //use factory to send the updated user preferences to the server
		Preferences.savePreferences($scope.userPreferences);
	};
});
