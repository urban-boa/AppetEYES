var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var user = require('./server/user-controller.js');
var imageInfo = require('./server/image-restaurant-controller.js');
var image = require('./server/image-controller.js');
var app = express();
var mongodb = process.env.IP;

mongoose.connect(mongodb || 'mongodb://localhost/appetEYES');
app.use(express.static(__dirname + '/app'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//user-signin routes
app.post('/users/signin', user.signin);
app.post('/users/signup', user.signup);
app.get('/users/signedin', user.checkAuth);

//if the client is not pinging a user-signin route, 
//then we check if the client is signed in
app.use(user.decode);

//user-picture history changes
app.get('/users/likes', imageInfo.getUserLikes);
app.post('/users/likes', imageInfo.saveUserLikes);

//user-preference change routes
app.get('/users/preferences', imageInfo.getUserPreferences);
app.post('/users/preferences', imageInfo.changeUserPreferences);

//get restaurant information
app.get('/restaurant/info', imageInfo.getRestaurantInfo);

//save image info
app.post('/image/', image.saveImage);

//save restaurant info
app.post('/restaurant', image.saveRestaurant);

//server listen
app.listen(process.env.PORT || '8080');

module.exports = app;
