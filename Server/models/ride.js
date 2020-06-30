const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RideSchema = new Schema({
	userId: { type: String, required: true },
	departingDate: { type: Date, required: true },
	departingLocation: { type: String, required: true },
	departingTime: { type: String, required: true },
	arrivingLocation: { type: String, required: true },
	price: { type: Number, required: true },
	dropOffAlong: { type: String, required: true },
	driverName: { type: String, required: true },
	driverNumber: { type: String, required: true },
	avatar: { type: String, required: true },
});

module.exports = mongoose.model('Ride', RideSchema);
