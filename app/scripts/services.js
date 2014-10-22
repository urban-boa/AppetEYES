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


  var pictures = [{
      link:'http://dicaspm.com/wp-content/uploads/2013/12/churrasco1.jpg',
      name:'Delicious Sirloin' 
    },
  {link:'http://www.mercadomineiro.com.br/adminpreco/upload/churrasqueiro-pesquisa-precos.jpg', name:'Juicy Steak'},
  {link:'http://upload.wikimedia.org/wikipedia/commons/5/59/Churrasco.jpg',name:'Tender Dream'}
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
      var randomizer = Math.floor(Math.random() * (pictures.length - 1));
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

.factory('Yelper',function($http){

  return {
    search:function(category,location){
      console.log('Searching for',category,location);
      var parsedLoc = location.split(' ').join('-');
      console.log('This is the thin',parsedLoc);
      var yelpUrl = category + '*' + parsedLoc;
      return $http.get('/yelp/' + yelpUrl);
      
    },
    pics:function(){
      // return pictures;
    }
  };
});

