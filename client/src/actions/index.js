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
	FETCH_ACCOUNT,
	FAILED_SIGN_IN,
	SUCCESSFUL_SIGN_IN,
	FAILED_RIDE_CREATE,
	SUCCESSFUL_RIDE_CREATE,
	FAILED_REGISTER,
	ATTEMPT_REGISTER,
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
		dispatch({ type: SIGN_IN, payload: response.data });
		dispatch({ type: SUCCESSFUL_SIGN_IN }); //Update validation state
		history.push('/rides'); //Send user back to main rides page
	} else {
		dispatch({ type: FAILED_SIGN_IN, payload: response.data.error }); //Update validation state
	}
};

export const register = ({ name, number, password }) => async (dispatch) => {
	const response = await auth.put('/register', { name, number, password });
	if (response.data.error) {
		dispatch({ type: FAILED_REGISTER, payload: response.data.error });
		await delay(3000); //Display error message for 3 seconds
		dispatch({ type: ATTEMPT_REGISTER });
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

export const createRide = (formvalues, { accessToken, userId }) => async (
	dispatch
) => {
	const response = await rides.put(
		'/rides',
		{ ...formvalues, userId },
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

//////////Review Actions
export const fetchReviews = (token) => async (dispatch) => {
	const response = await rides.get('/api/ratings', {
		headers: { Authorization: 'Bearer ' + token },
	});
	dispatch({ type: FETCH_REVIEWS, payload: response.data });
};

export const fetchAccount = ({ userId, accessToken }) => async (dispatch) => {
	const response = await rides.get(`/account/${userId}`, {
		headers: { Authorization: 'Bearer ' + accessToken },
	});
	dispatch({ type: FETCH_ACCOUNT, payload: response.data });
};

export const addReview = (formValues, token) => async (dispatch) => {
	const response = await rides.put('/api/addRating', {
		data: { formValues },
		headers: { Authorization: 'Bearer ' + token },
	});
	dispatch({ type: ADD_REVIEW, payload: response.data });
};
