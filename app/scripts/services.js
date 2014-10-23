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

  var selected = [];
  var picArr = [];

  return {
    addPics:function(arr){
      picArr = arr;
    },
    currentPics:function(){
      return picArr;
    },
    isNotLoaded:true,

    addToSelection:function(image){
      selected.push(image);
    },
    getSelected:function(){
      return selected;
    },
    searchFood:function(name){
      for(var i = 0;i < selected.length;i++ ){
        if(selected[i].name === name){
          return selected[i];
        }
      }
      return {
            name:'Not Found'
        };
      }
    };
})

.factory('Yelper',function($http){

  return {
    search: function(category,location){
      console.log('Searching for',category,location);
      var parsedLoc = location.split(' ').join('-');
      console.log('This is the thin',parsedLoc);
      var yelpUrl = category + '*' + parsedLoc;
      return $http.get('/yelp/' + yelpUrl);
      
    },
    pics: function(){
      // return pictures;
    }
  };
})

.factory('Auth', function ($http, $location, $window, $state) {

  var login = function (user) {
    return $http({
      method: 'POST',
      url: '/users/signin',
      data: user
    })
    .then(function (resp) {
      if (resp.data.token) {
        $state.transitionTo('tab.dash');
      } else {
        $state.transitionTo('tab.account');
      }
      setToken(resp.data.token);
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/users/signup',
      data: user
    })
    .then(function (resp) {
      //if (resp.data.token) redirect
      setToken(resp.data.token);
      if (resp.data.token) $state.transitionTo('tab.dash');
    });
  };

//// STILL NEED TO EDIT
  var isAuth = function () {
    return !!$window.localStorage.getItem('com.appeteyes');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.appeteyes');
  };

  var setToken = function(givenToken){
    $window.localStorage.setItem('com.appeteyes', givenToken);
  };

  var getToken = function(){
    return $window.localStorage.getItem('com.appeteyes');
  };

  return {
    login: login,
    signup: signup,
    isAuth: isAuth,
    signout: signout,
    setToken:setToken,
    getToken:getToken
  };

});
