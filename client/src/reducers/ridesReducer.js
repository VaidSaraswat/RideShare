import _ from "lodash";
import {
  FETCH_RIDES,
  FETCH_RIDE,
  DELETE_RIDE,
  EDIT_RIDE,
  SIGN_OUT,
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_RIDES:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    case FETCH_RIDE:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_RIDE:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_RIDE:
      return _.omit(state, action.payload);
    case SIGN_OUT:
      return {};
    default:
      return state;
  }
};
