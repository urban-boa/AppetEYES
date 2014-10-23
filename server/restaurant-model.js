var mongoose = require('mongoose');

var RestaurantSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true
  },
  restaurantName: String,
  address: String,
<<<<<<< HEAD
  phoneNumber: String//,
  //price: Number
=======
  phoneNumber: String,
  price: Number
>>>>>>> 0ad35460dc58588513065392b414b4afa7199f73
});

module.exports = mongoose.model('restaurant', RestaurantSchema);