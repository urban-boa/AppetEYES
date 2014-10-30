'use strict';
angular.module('Appeteyes.controllers')

.controller('MyFoodiesCtrl', function($scope, Fooder, $http) {
  $scope.foods = Fooder.getSelected();
  $http({
    method: 'GET',
    url: '/users/likes'
  })
  .then(function(data){
    console.log('data from get request on users/liked', data);
    Fooder.setLiked(data.data);
  });
});
