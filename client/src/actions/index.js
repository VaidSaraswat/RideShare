import {
  SIGN_IN,
  SIGN_OUT,
  FETCH_RIDES,
  ADD_RIDE,
  ADD_REVIEW,
  FETCH_REVIEWS,
  FETCH_ACCOUNT,
} from "./types";

import rides from "../apis/rideServer";
import auth from "../apis/authServer";

const signIn = (userName, password) => (dispatch)=> {
  const response = await auth.post('/login', {data: {
    name: userName,
    password: password
  }});

  dispatch({type: SIGN_IN, payload: response.data});
};

const signOut = (refreshToken) => {
  const response = await auth.post('/logout', {data: {
    token: refreshToken
  }});
  dispatch({type: SIGN_OUT, payload: response.data});
};

const fetchRides = (token) => async (dispatch) => {
  const response = await rides.get("/api/rides", {
    headers: { Authorization: "Bearer " + token },
  });
  dispatch({ type: FETCH_RIDES, payload: response.data });
};

const fetchReviews = (token) => async (dispatch) => {
  const response = await rides.get("/api/ratings", {
    headers: { Authorization: "Bearer " + token },
  });
  dispatch({ type: FETCH_REVIEWS, payload: response.data });
};

const fetchAccount = (token) => async (dispatch) => {
  const response = await rides.get("/api/account", {
    headers: { Authorization: "Bearer " + token },
  });
  dispatch({ type: FETCH_ACCOUNT, payload: response.data });
};

const addRide = (formValues, token) => async (dispatch) => {
  const response = await rides.put("/api/rides", {
    data: {formValues},
    headers: { Authorization: "Bearer " + token },
  });
  dispatch({ type: ADD_RIDE, payload: response.data });
};

const addReview = (formValues, token) => async (dispatch) => {
  const response = await rides.put("/api/addRating", {
    data: {formValues},
    headers: { Authorization: "Bearer " + token },
  });
  dispatch({ type: ADD_REVIEW, payload: response.data });
};