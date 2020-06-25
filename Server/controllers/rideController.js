const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Ride = require('../models/ride.js');
//Needed to create a date in the iso string format
function parseDate(input, time) {
	let parts = input.match(/(\d+)/g);
	let hours = parseInt(time.substring(0, 2));
	let mins = parseInt(time.substring(3, 5));
	return new Date(parts[0], parts[1] - 1, parts[2], hours, mins);
}
//Needed to authenticate user's token
function authenticateToken(req, res, next) {
	const authHeader = req.headers['authorization']; //Get the authorization header
	const token = authHeader && authHeader.split(' ')[1]; //Token is going to be either undefined or the correct token
	req.payload = null; //Set the payload to null
	if (token == null) {
		res.send('No token received!');
	} else {
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
			if (err) {
				res.send('Token No Longer Valid');
			} else {
				req.payload = payload;
			}
		});
		next();
	}
}
//Needed to update rides db when they have departed
async function removeDepartedRides() {
	let today = new Date();
	let datesArr = [];
	await Ride.find((err, rides) => {
		if (err) {
			console.log(err);
		} else {
			datesArr = rides;
		}
	});
	for (let i = 0; i < datesArr.length; i++) {
		if (today > new Date(datesArr[i].departingDate)) {
			await Ride.findOneAndRemove(
				{ departingDate: datesArr[i].departingDate },
				(err) => {
					if (err) {
						console.log(err);
					}
				}
			);
		}
	}
}
router
	.route('/api/rides')
	//Get all the rides
	.get(authenticateToken, async (req, res) => {
		//Athenticate User
		if (req.payload !== null) {
			//check for rides that have departed
			removeDepartedRides();
			Ride.find((err, rides) => {
				if (err) {
					res.send(err);
				} else {
					//Sort rides by dates, the earlier ones are showed first
					rides.sort((a, b) => a.departingDate - b.departingDate);
					res.send(rides);
				}
			});
		}
	})

	//Create ride and save to database
	.put(authenticateToken, async (req, res) => {
		if (req.payload !== null) {
			//Create ride object and format information
			let ride = new Ride();
			ride.departingDate = parseDate(
				req.body.departingDate,
				req.body.departingTime
			);
			ride.userId = req.body.userId;
			ride.departingLocation = req.body.departingLocation;
			ride.arrivingLocation = req.body.arrivingLocation;
			ride.departingTime = req.body.departingTime;
			ride.price = req.body.price;
			ride.driverName = req.body.driverName;
			ride.driverNumber = req.body.driverNumber;
			ride.dropOffAlong = req.body.dropOffAlong;

			//Check if the ride already exists if so then redirect indicating that the ride was already created, otherwise save the ride to the db
			let exists = await Ride.exists({
				departingDate: ride.departingDate,
				departingLocation: ride.departingLocation,
				departingTime: ride.departingTime,
				arrivingLocation: ride.arrivingLocation,
				price: ride.price,
				driverName: ride.driverName,
				driverNumber: ride.driverNumber,
			});

			if (exists) {
				res.json({ error: 'Sorry this ride was already created!' });
			} else {
				ride.save((err) => {
					if (err) {
						res.json({ error: err });
					} else {
						res.json({ success: 'Ride was created sucessfully!' });
					}
				});
			}
		}
	});

router
	.route('/api/rides/:id')
	.get(authenticateToken, (req, res) => {
		if (req.payload !== null) {
			Ride.findById(req.params.id, (err, ride) => {
				if (err) {
					res.json({ error: err });
				} else {
					res.json(ride);
				}
			});
		}
	})

	.patch(authenticateToken, (req, res) => {
		if (req.payload !== null) {
			Ride.findByIdAndUpdate(
				req.params.id,
				{
					...req.body,
					departingDate: parseDate(
						req.body.departingDate,
						req.body.departingTime
					),
				},
				{ new: true },
				(err, ride) => {
					if (err) {
						res.json({ error: err });
					} else {
						res.json(ride);
					}
				}
			);
		}
	})
	//Delete ride from database
	.delete(authenticateToken, (req, res) => {
		if (req.payload !== null) {
			Ride.findOneAndRemove({ _id: req.params.id }, (err) => {
				if (err) {
					res.json({ error: err });
				} else {
					res.json({ message: 'Ride was deleted successfully' });
				}
			});
		}
	});

router.route('/api/rides/updateName').post((req, res) => {
	Ride.updateMany(
		{ driverName: req.body.oldName },
		{ driverName: req.body.newName },
		(err) => {
			if (err) {
				res.send(err);
			} else {
				res.send('Rider name was updated successfully!');
			}
		}
	);
});

router.route('/api/rides/updateNumber').post((req, res) => {
	Ride.updateMany(
		{ driverName: req.body.name },
		{ driverNumber: req.body.newNumber },
		(err) => {
			if (err) {
				res.send(err);
			} else {
				res.send('Ride phone number was updated successfully!');
			}
		}
	);
});

module.exports = router;
