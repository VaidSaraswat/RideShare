import { AVATAR_SELECTED } from '../actions/types';
export default (state = 'christian.jpg', action) => {
	if (action.type === AVATAR_SELECTED) {
		return action.payload;
	}

	return state;
};
