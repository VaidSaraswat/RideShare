import _, { mapKeys } from 'lodash';
import {
	FETCH_RIDES,
	FETCH_RIDE,
	DELETE_RIDE,
	EDIT_RIDE,
	SIGN_OUT,
	EDIT_RIDE_AVATAR,
} from '../actions/types';

export default (state = {}, action) => {
	switch (action.type) {
		case FETCH_RIDES:
			return { ..._.mapKeys(action.payload, '_id'), ...state };
		case FETCH_RIDE:
			return { [action.payload._id]: action.payload };
		case EDIT_RIDE:
			return { ...state, [action.payload._id]: action.payload };
		case EDIT_RIDE_AVATAR:
			return { ...state, ...mapKeys(action.payload, '_id') };
		case DELETE_RIDE:
			return _.omit(state, action.payload);
		case SIGN_OUT:
			return {};
		default:
			return state;
	}
};
