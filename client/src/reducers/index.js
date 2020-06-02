import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import validateReducer from "./validateReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  validate: validateReducer,
});
