const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Review = require('../models/review.js');

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
router.route('/api/addReview').put(authenticateToken, (req, res) => {
	if (req.payload !== null) {
		let newReview = {
			comment: req.body.comment,
			reviewerName: req.body.reviewerName,
			reviewerAvatar: req.body.reviewerAvatar,
		};
		Review.findOneAndUpdate(
			{ driverName: req.body.driverName },
			{ $push: { reviews: { ...newReview } } },
			{ new: true, upsert: true },
			(err, review) => {
				if (err) {
					res.json({ error: err });
				} else {
					res.json(review);
				}
			}
		);
	}
});

router.route('/api/reviews').get(authenticateToken, (req, res) => {
	Review.find((err, reviews) => {
		if (err) {
			res.send(err);
		} else {
			res.send(reviews);
		}
	});
});

module.exports = router;
