'use strict';
angular.module('Appeteyes.controllers')

.controller('FoodDetailCtrl', function($scope, $stateParams, Fooder) {
  $scope.food = Fooder.searchFood($stateParams.name);
  console.log($scope.food);
});