const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
	driverName: { type: String, required: true },
	reviews: [{ comment: String, reviewerName: String, reviewerAvatar: String }],
});

module.exports = mongoose.model('Rating', ReviewSchema);
