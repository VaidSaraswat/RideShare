const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RideSchema = new Schema({
    departingDate: {type: String, required: true},
    departingLocation: {type: String, required: true},
    departingTime: {type: String, required: true},
    arrivingLocation: {type: String, required: true},
    price: {type: Number, required: true},
    dropOffAlong: {type: Boolean, required: true},
    driverInfo: {type: Object, required: false}
});

module.exports = mongoose.model('Ride', RideSchema);