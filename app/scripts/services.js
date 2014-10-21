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

.factory('Auth', function ($http, $location, $window) {

  var login = function (user) {
    return $http({
      method: 'POST',
      url: 'process.env.IP' || '127.0.0.1:8100',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

//// STILL NEED TO EDIT
  var isAuth = function () {
    return !!$window.localStorage.getItem('com.shortly');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.shortly');
    $location.path('/login');
  };


  return {
    login: login,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});