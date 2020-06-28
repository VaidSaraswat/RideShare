import { SIGN_IN, SIGN_OUT } from '../actions/types';

const INITIAL_STATE = {
	isSignedIn: false,
	accessToken: null,
	refreshToken: null,
	userId: null,
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
			};
		case SIGN_OUT:
			return {
				...state,
				isSignedIn: false,
				userName: null,
				accessToken: null,
				refreshToken: null,
				userId: null,
			};
		default:
			return state;
	}
};
