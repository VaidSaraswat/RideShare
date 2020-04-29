const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
  driver: {type: String, required: true},
  rating: {type: Number, required: true}
});

module.exports = mongoose.model('Rating', RatingSchema);