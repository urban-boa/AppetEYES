var express = require('express');

var bodyParser = require('body-parser');
var user = require('./server/user-controller.js');
var yelp = require('./server/api/yelp.controller.js');
var app = express();
var mongoose    = require('mongoose');
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

//user-preference change routes

//server listen

app.listen(process.env.PORT || '8080');

module.exports = app;
