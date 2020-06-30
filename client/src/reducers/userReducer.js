import { FETCH_ACCOUNT, UPDATE_ACCOUNT, SIGN_OUT } from '../actions/types';

export default (state = {}, action) => {
	switch (action.type) {
		case FETCH_ACCOUNT:
			return { ...state, ...action.payload };
		case UPDATE_ACCOUNT:
			return { ...state, ...action.payload };
		case SIGN_OUT:
			return {};
		default:
			return state;
	}
};
