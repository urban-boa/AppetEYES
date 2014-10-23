'use strict';
angular.module('Appeteyes.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];



  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  };
})

.factory('Fooder',function(){

  var pictures = [
    { link:'http://dicaspm.com/wp-content/uploads/2013/12/churrasco1.jpg',
      name:'Delicious Sirloin'
    },
    { link:'http://www.mercadomineiro.com.br/adminpreco/upload/churrasqueiro-pesquisa-precos.jpg',
      name:'Juicy Steak'
    },
    { link:'http://upload.wikimedia.org/wikipedia/commons/5/59/Churrasco.jpg',
      name:'Tender Dream'
    }
  ];

  var selected = [];

  return {
    all: function() {
      return pictures;
    },
    get: function(foodId) {
      // Simple index lookup
      return pictures[foodId];
    },
    getRandomPic:function(){
      var randomizer = Math.floor(Math.random() * (pictures.length));
      return pictures[randomizer];
    },
    addToSelection:function(image){
      selected.push(image);
    },
    getSelected:function(){
      return selected;
    }
  };
})

//Holds the logic for users to set up their 'preferences'
.factory('Preferences', function($http){
  //temp storage mechanism for cuisine types
  var cuisines = [
    'Give Me Random!',
    'Italian',
    'Thai',
    'American',
    'French',
    'Japanese',
    'Chinese',
    'Seafood',
    'Ethopian/Eritrean',
    'Burmese',
    'Mexican',
    'Mediterranean',
    'Middle Eastern',
    'Soul Food',
    'Korean',
    'Brazilian',
    'German',
    'Dessert'
  ];

  //object to be updated by controller based on user input. Later to be sent to server.
  var userPreferences = {
    token: 0,
    cuisines: [],
    location: '',
  };

  return {
    //takes an array as a parameter and outputs array to controller
    listCuisines: function(){
      return cuisines;
    },

    //retrieves stored user preferences from server/db
    importPreferences: function($http){

      //send GET request to server - use response data to fill userSettings
      var promise = $http.get('/users/preferences')
        .then(function(data){
          userPreferences.cuisines = data.cuisines;
          userPreferences.location = data.location;
        })

      return userPreferences;
    },

    //takes an object with all preferences saved
    //and updates factory userSettings and sends preferences
    savePreferences: function(newPreferences){
      userPreferences.token = newPreferences.token;
      userPreferences.cuisines = newPreferences.cuisines;
      userPreferences.location = newPreferences.location;
      //send POST request to server with userSettings as data
      var promise = $http.post('/users/preferences', userPreferences);
      prom

      console.log('now I just send a post');
      console.log(userPreferences);
      
    }
  };
});