import { FAILED_SIGN_IN, SUCCESSFUL_SIGN_IN } from "../actions/types";

const INITIAL_STATE = {
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FAILED_SIGN_IN:
      return { ...state, error: action.payload };
    case SUCCESSFUL_SIGN_IN:
      return { ...state, error: null };
    default:
      return state;
  }
};
