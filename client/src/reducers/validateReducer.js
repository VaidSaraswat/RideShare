import {
	FETCH_RIDE_ERROR,
	FAILED_SIGN_IN,
	SUCCESSFUL_SIGN_IN,
	FAILED_RIDE_CREATE,
	SUCCESSFUL_RIDE_CREATE,
} from '../actions/types';

const INITIAL_STATE = {
	error: null,
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_RIDE_ERROR:
			return { ...state, error: action.payload };
		case FAILED_SIGN_IN:
			return { ...state, error: action.payload };
		case FAILED_RIDE_CREATE:
			return { ...state, error: action.payload };
		case SUCCESSFUL_SIGN_IN:
			return { ...state, error: null };
		case SUCCESSFUL_RIDE_CREATE:
			return { ...state, error: null };
		default:
			return state;
	}
};
