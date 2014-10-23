var Q = require('q'); // A Promise library
var mongoose = require('mongoose');
var User = require('./user-model.js');
var Image = require('./image-model.js');
var Restaurant = require('./restaurant-model.js');

module.exports = {

  saveUserLikes: function(req, res, next){
    //req.username is set by the middleware user.decode
    var username = req.username;
    var findUser = Q.nbind(User.findOne, User);
    var findImage = Q.nbind(Image.findOne, Image);

    //request object should have a body that contains
    //newly liked/disliked images arrays

    findUser({username:username})
      .then(function(user){
        if (!user) {
          next(new Error('user does not exist.'));
        } else {
          user.likedImages = user.likedImages.concat(req.body.liked);
          user.dislikedImages = user.likedImages.concat(req.body.disliked);
          user.save(function(error){
            next(error);
          });
          res.status(200).end();
        }
      })
      .fail(function(error){
        next(error);
      });
  },

  getUserLikes: function(req, res, next){
    //req.username is set by the middleware user.decode
    var username = req.username;
    var findUser = Q.nbind(User.findOne, User);
    var findImage = Q.nbind(Image.findOne, Image);

    findUser({username:username})
      .then(function(user){
        if (!user) {
          next(new Error('user does not exist.'));
        } else {
          var urls = [];
          var likedImages = user.likedImages;
          for (var i = 0; i < likedImages.length; i++){
            findImage({ObjectId: likedImages[i]})
              .then(function(image){
                if (!image) {
                  console.log('Image not found in getUserLikes');
                } else {
                  urls.push(image.url);
                }
              })
              .then(function(){
                res.json(urls);
              })
              .fail(function(error){
                next(error);
              })
          }//end for-loop
        }//end if-else
      });
  },

  changeUserPreferences: function(req, res, next){
    //req.username is set by the middleware user.decode
    var username = req.username;
    //request should have new preferences in its body
    //it should be stored in a property called "newPreferences"
    //which should be an object
    var newPrefs = req.body;
    var findOne = Q.nbind(User.findOne, User);

    //update the existing 
    findOne({username:username})
      .then(function(user){
        if (!user) {
          next(new Error('user does not exist.'));
        } else {
          user.location = newPrefs.location;
          user.cusines = newPrefs.cusines;
          //user.price = newPrefs.price;
          user.save(function(error){
            next(error);
          });
          res.status(200).end();
        }
      })
      .fail(function(error){
        next(error);
      });
  },

  getUserPreferences: function(req, res, next){
    //req.username is set by the middleware user.decode
    var username = req.username;
    var findOne = Q.nbind(User.findOne, User);

    //get an array of user preferred cuisines
    findOne({username: username})
      .then(function(user){
        //make sure user exists
        if (!user){
          next(new Error('user does not exist.'));
        } else {
          res.json(user.preferredCategories);
        }
      })
      .fail(function(error){
        next(error);
      });
  },

  getRestaurantInfo: function(req, res, next){
    //request body should contain the ImageID
    var imageID = req.body.imageID;
    var findImage = Q.nbind(Image.findOne, Image);
    var findRestaurant = Q.nbind(Restaurant.findOne, Restaurant);

    findImage({ObjectId: imageID})
      .then(function(image){
        if (!image) {
          next(new Error('image does not exist.'));
        } else {
          return findRestaurant({ObjectId: image.restaurantID})
        }
      })
      .then(function(restaurant){
        restaurant
          .then(function(restaurant){
            res.json(restaurant);
          })
          .fail(function(error){
            next(error);
          });
      })
      .fail(function(error){
        next(error);
      });

  }

};
