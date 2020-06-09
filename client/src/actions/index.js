import {
  SIGN_IN,
  SIGN_OUT,
  FETCH_RIDES,
  FETCH_RIDE,
  DELETE_RIDE,
  EDIT_RIDE,
  ADD_REVIEW,
  FETCH_REVIEWS,
  FETCH_ACCOUNT,
  FAILED_SIGN_IN,
  SUCCESSFUL_SIGN_IN,
  FAILED_RIDE_CREATE,
  SUCCESSFUL_RIDE_CREATE,
} from "./types";

import rides from "../apis/rideServer";
import auth from "../apis/authServer";
import history from "../history";

//////////Authentication Actions
export const signIn = ({ name, password }) => async (dispatch) => {
  const response = await auth.post("/login", { name, password });
  //Only update sign in state if server sends back a refresh and access token
  if (response.data.accessToken && response.data.refreshToken) {
    dispatch({ type: SIGN_IN, payload: response.data });
    dispatch({ type: SUCCESSFUL_SIGN_IN }); //Update validation state
    history.push("/rides"); //Send user back to main rides page
  } else {
    dispatch({ type: FAILED_SIGN_IN, payload: response.data }); //Update validation state
  }
};

//Destructure the token key out of the refreshToken and send it to the server to remove it from list of refreshTokens
export const signOut = ({ token }) => async (dispatch) => {
  const response = await auth.post("/logout", { token });
  dispatch({ type: SIGN_OUT, payload: response.data });
};

//////////Ride Actions
export const fetchRides = ({ accessToken }) => async (dispatch) => {
  const response = await rides.get("/rides", {
    headers: { Authorization: "Bearer " + accessToken },
  });
  dispatch({ type: FETCH_RIDES, payload: response.data });
};

export const fetchRide = (token, id) => async (dispatch) => {
  const response = rides.get(`/api/rides/${id}`, {
    headers: { Authorization: "Bearer " + token },
  });

  dispatch({ type: FETCH_RIDE, payload: response.data });
};

export const createRide = (formvalues, { accessToken }) => async (dispatch) => {
  const response = await rides.put("/rides", formvalues, {
    headers: { Authorization: "Bearer " + accessToken },
  });

  //If there is an error update validate reducer
  if (response.data.error) {
    dispatch({ type: FAILED_RIDE_CREATE, payload: response.data.error }); //Set the error message
  } else {
    dispatch({ type: SUCCESSFUL_RIDE_CREATE }); //Set the success message
    history.push("/rides");
  }
};

export const editRide = (token, formValues, id) => async (dispatch) => {
  const response = rides.patch(`/api/rides/${id}`, {
    data: formValues,
    headers: { Authorization: "Bearer " + token },
  });

  dispatch({ type: EDIT_RIDE, payload: response.data });
};

export const deleteRide = (token, id) => async (dispatch) => {
  await rides.delete(`/api/rides/${id}`, {
    headers: { Authorization: "Bearer " + token },
  });

  dispatch({ type: DELETE_RIDE, payload: id });
};

//////////Review Actions
export const fetchReviews = (token) => async (dispatch) => {
  const response = await rides.get("/api/ratings", {
    headers: { Authorization: "Bearer " + token },
  });
  dispatch({ type: FETCH_REVIEWS, payload: response.data });
};

export const fetchAccount = (token) => async (dispatch) => {
  const response = await rides.get("/api/account", {
    headers: { Authorization: "Bearer " + token },
  });
  dispatch({ type: FETCH_ACCOUNT, payload: response.data });
};

export const addReview = (formValues, token) => async (dispatch) => {
  const response = await rides.put("/api/addRating", {
    data: { formValues },
    headers: { Authorization: "Bearer " + token },
  });
  dispatch({ type: ADD_REVIEW, payload: response.data });
};
