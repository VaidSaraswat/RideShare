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

export const signIn = ({ name, password }) => async (dispatch) => {
  const response = await auth.post("/login", { name, password });
  dispatch({ type: SIGN_IN, payload: response.data });
};

export const signOut = (refreshToken) => async (dispatch) => {
  const response = await auth.post("/logout", {
    data: {
      token: refreshToken,
    },
  });
  dispatch({ type: SIGN_OUT, payload: response.data });
};

export const fetchRides = (token) => async (dispatch) => {
  const response = await rides.get("/api/rides", {
    headers: { Authorization: "Bearer " + token },
  });
  dispatch({ type: FETCH_RIDES, payload: response.data });
};

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

export const addRide = (formValues, token) => async (dispatch) => {
  const response = await rides.put("/api/rides", {
    data: { formValues },
    headers: { Authorization: "Bearer " + token },
  });
  dispatch({ type: ADD_RIDE, payload: response.data });
};

export const addReview = (formValues, token) => async (dispatch) => {
  const response = await rides.put("/api/addRating", {
    data: { formValues },
    headers: { Authorization: "Bearer " + token },
  });
  dispatch({ type: ADD_REVIEW, payload: response.data });
};
