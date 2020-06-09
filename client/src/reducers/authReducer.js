import { SIGN_IN, SIGN_OUT } from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: false,
  accessToken: null,
  refreshToken: null,
  userId: null,
  name: null,
  number: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        userId: action.payload.userId,
        name: action.payload.name,
        number: action.payload.number,
      };
    case SIGN_OUT:
      return {
        ...state,
        isSignedIn: false,
        userName: null,
        accessToken: null,
        refreshToken: null,
        userId: null,
        name: null,
        number: null,
      };
    default:
      return state;
  }
};
