import { FETCH_REVIEWS, ADD_REVIEW } from '../actions/types';
import _ from 'lodash';

export default (state = {}, action) => {
	switch (action.type) {
		case FETCH_REVIEWS:
			return { ...state, ..._.mapKeys(action.payload, '_id') };
		case ADD_REVIEW:
			return { ...state, [action.payload._id]: action.payload };
		default:
			return state;
	}
};
