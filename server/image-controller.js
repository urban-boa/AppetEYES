var Q = require('q');
var mongoose = require('mongoose');
var image = require('./image-model.js');
var restaurant = require('./restaurant-model.js');

module.exports = {

  saveRestaurant: function(req, res, next){

    //request body should contain an array of restaurants
    //returned by the yelp search API
    var searchResults = req.body.businesses;

    var findRestaurant = Q.nbind(Restaurant.findOne, Restaurant);
    var createRestaurant = Q.nbind(Restaurant.create, Restaurant);

    for (var i = 0; i < searchResults.length; i++) {
      var restaurant = {
        url: searchResults[i].url,
        restaurantName: searchResults[i].name,
        address: searchResults[i].join(' \n'),
        phoneNumber: searchResults[i].display_phone
      };
      findRestaurant({url: restaurant.url})
        .then(function(result){
          if (!result) {
            return createRestaurant(restaurant);
          }
        })
        .then(function(result){
          saveImage(searchResults[i].image_url, result.ObjectId);
        })
        .fail(function(error){
          next(error);
        });
    }

  },

  saveImage: function(image_url, restaurantID){

    var findImage = Q.nbind(Image.findOne, Image);
    var createImage = Q.nbind(Image.create, Image);

    findImage({url: image_url})
      .then(function(image){
        if (!image) {
          return createImage({
            url: image_url,
            restaurantID: restaurantID
          });
        }
      })
      .fail(function(error){
        next(error);
      });
      
  }

};