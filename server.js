var express = require('express');

var bodyParser = require('body-parser');
<<<<<<< HEAD
var mongoose = require('mongoose');
var user = require('./server/user-controller.js');
var imageInfo = require('./server/image-restaurant-controller.js');
var image = require('./server/image-controller.js');
var app = express();
var mongodb = process.env.IP;

mongoose.connect(mongodb || 'mongodb://localhost/appetEYES');
=======
var user = require('./server/user-controller.js');
var yelp = require('./server/api/yelp.controller.js');
var app = express();
var mongoose    = require('mongoose');
>>>>>>> 0ad35460dc58588513065392b414b4afa7199f73
app.use(express.static(__dirname + '/app'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
console.log('Starting APP');
//Mongo DB Connection
mongoose.connect('mongodb://localhost/appteys');
//user-signin routes
app.post('/users/signin', user.signin);
app.post('/users/signup', user.signup);
app.get('/users/signedin', user.checkAuth);
app.get('/yelp/*', yelp.refinedSearch);

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

//save restaurant info
app.post('/restaurant/info', image.saveRestaurant);

//server listen

app.listen(process.env.PORT || '8080');

module.exports = app;
