import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import validateReducer from './validateReducer';
import ridesReducer from './ridesReducer';
import userReducer from './userReducer';
import avatarReducer from './avatarReducer';
import selectedAvatar from './selectedAvater';
import reviewsReducer from './reviewsReducer';
export default combineReducers({
	auth: authReducer,
	form: formReducer,
	validate: validateReducer,
	rides: ridesReducer,
	reviews: reviewsReducer,
	user: userReducer,
	avatar: avatarReducer,
	selectedImage: selectedAvatar,
});
