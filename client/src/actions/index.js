import {
	SIGN_IN,
	SIGN_OUT,
	FETCH_RIDES,
	FETCH_RIDE,
	FETCH_RIDE_ERROR,
	DELETE_RIDE,
	EDIT_RIDE,
	FAILED_RIDE_EDIT,
	ADD_REVIEW,
	FETCH_REVIEWS,
	FAILED_REVIEW_CREATE,
	FETCH_ACCOUNT,
	UPDATE_ACCOUNT,
	FAILED_SIGN_IN,
	SUCCESSFUL_SIGN_IN,
	FAILED_RIDE_CREATE,
	SUCCESSFUL_RIDE_CREATE,
	FAILED_REGISTER,
	ATTEMPT,
	AVATAR_SELECTED,
	FAILED_AVATAR_SELECTED,
	EDIT_RIDE_AVATAR,
} from './types';

import rides from '../apis/rideServer';
import auth from '../apis/authServer';
import history from '../history';

//Used to create delay
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

//////////Authentication Actions
export const signIn = ({ name, password }) => async (dispatch) => {
	const response = await auth.post('/login', { name, password });
	//Only update sign in state if server sends back a refresh and access token
	if (response.data.accessToken && response.data.refreshToken) {
		dispatch({
			type: SIGN_IN,
			payload: {
				accessToken: response.data.accessToken,
				refreshToken: response.data.refreshToken,
				userId: response.data.userId,
			},
		});
		dispatch({
			type: FETCH_ACCOUNT,
			payload: {
				name: response.data.username,
				number: response.data.number,
				avatar: response.data.avatar,
			},
		});
		dispatch({ type: AVATAR_SELECTED, payload: response.data.avatar });
		dispatch({ type: SUCCESSFUL_SIGN_IN }); //Update validation state
		history.push('/rides'); //Send user back to main rides page
	} else {
		dispatch({ type: FAILED_SIGN_IN, payload: response.data.error }); //Update validation state
		await delay(3000); //Display error message for 3 seconds
		dispatch({ type: ATTEMPT });
	}
};

export const register = ({ name, number, password }) => async (dispatch) => {
	const response = await auth.put('/register', { name, number, password });
	if (response.data.error) {
		dispatch({ type: FAILED_REGISTER, payload: response.data.error });
		await delay(3000); //Display error message for 3 seconds
		dispatch({ type: ATTEMPT });
	} else {
		history.push('/'); //Send user to the login page
	}
};
//Destructure the token key out of the refreshToken and send it to the server to remove it from list of refreshTokens
export const signOut = ({ token }) => async (dispatch) => {
	await auth.post('/logout', { token });
	dispatch({ type: SIGN_OUT });
};

//////////Ride Actions
export const fetchRides = ({ accessToken }) => async (dispatch) => {
	const response = await rides.get('/rides', {
		headers: { Authorization: 'Bearer ' + accessToken },
	});
	dispatch({ type: FETCH_RIDES, payload: response.data });
};

export const fetchRide = (id, { accessToken }) => async (dispatch) => {
	const response = await rides.get(`/rides/${id}`, {
		headers: { Authorization: 'Bearer ' + accessToken },
	});
	//If there is an error update validate reducer
	if (response.data.error) {
		dispatch({ type: FETCH_RIDE_ERROR, payload: response.data });
	} else {
		dispatch({ type: FETCH_RIDE, payload: response.data });
	}
};

export const createRide = (
	formvalues,
	avatar,
	{ accessToken, userId }
) => async (dispatch) => {
	const response = await rides.put(
		'/rides',
		{ ...formvalues, avatar, userId },
		{
			headers: { Authorization: 'Bearer ' + accessToken },
		}
	);

	//If there is an error update validate reducer
	if (response.data.error) {
		dispatch({ type: FAILED_RIDE_CREATE, payload: response.data.error }); //Set the error message
	} else {
		dispatch({ type: SUCCESSFUL_RIDE_CREATE }); //Set the success message
		history.push('/rides');
	}
};

export const editRide = (formValues, { accessToken }, id) => async (
	dispatch
) => {
	const response = await rides.patch(
		`/rides/${id}`,
		{ ...formValues },
		{ headers: { Authorization: 'Bearer ' + accessToken } }
	);
	//If there is an error update validate reducer
	if (response.data.error) {
		dispatch({ type: FAILED_RIDE_EDIT, payload: response.data.error });
	} else {
		dispatch({ type: EDIT_RIDE, payload: response.data });
		history.push('/rides');
	}
};

export const deleteRide = ({ accessToken }, id) => async (dispatch) => {
	await rides.delete(`/rides/${id}`, {
		headers: { Authorization: 'Bearer ' + accessToken },
	});

	dispatch({ type: DELETE_RIDE, payload: id });
	history.push('/rides');
};

//////////Account Actions
export const fetchAccount = ({ userId, accessToken }) => async (dispatch) => {
	const response = await rides.get(`/account/${userId}`, {
		headers: { Authorization: 'Bearer ' + accessToken },
	});
	dispatch({ type: FETCH_ACCOUNT, payload: response.data });
	dispatch({ type: AVATAR_SELECTED, payload: response.data.avatar });
};
//////////Review Actions
export const fetchReviews = ({ accessToken }) => async (dispatch) => {
	const response = await rides.get('/reviews', {
		headers: { Authorization: 'Bearer ' + accessToken },
	});
	dispatch({ type: FETCH_REVIEWS, payload: response.data });
};

export const addReview = (
	formValues,
	{ name, avatar },
	{ accessToken }
) => async (dispatch) => {
	const response = await rides.put(
		'/addReview',
		{ ...formValues, reviewerName: name, reviewerAvatar: avatar },
		{ headers: { Authorization: 'Bearer ' + accessToken } }
	);

	if (response.data.error) {
		dispatch({ type: FAILED_REVIEW_CREATE, payload: response.data.error });
		await delay(3000); //Display error message for 3 seconds
		dispatch({ type: ATTEMPT });
	} else {
		dispatch({ type: ADD_REVIEW, payload: response.data });
	}
};

export const selectAvatar = (id, avatar, { accessToken }) => async (
	dispatch
) => {
	const response = await rides.post(
		`/account/updateAvatar/${id}`,
		{ avatar },
		{
			headers: { Authorization: 'Bearer ' + accessToken },
		}
	);
	if (response.data.error) {
		dispatch({ type: FAILED_AVATAR_SELECTED, payload: response.data.error });
		await delay(3000);
		dispatch({ type: ATTEMPT });
	} else {
		dispatch({ type: AVATAR_SELECTED, payload: response.data.avatar });
		dispatch({ type: UPDATE_ACCOUNT, payload: response.data });
	}
};

export const updateRideAvatar = (userId, avatar, { accessToken }) => async (
	dispatch
) => {
	const response = await rides.post(
		'/rides/updateAvatar',
		{ userId, avatar },
		{ headers: { Authorization: 'Bearer ' + accessToken } }
	);

	if (response.data.error) {
		dispatch({ type: FAILED_AVATAR_SELECTED, payload: response.data.error });
		await delay(3000);
		dispatch({ type: ATTEMPT });
	} else {
		dispatch({ type: EDIT_RIDE_AVATAR, payload: response.data });
	}
};
