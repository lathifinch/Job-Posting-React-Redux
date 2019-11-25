import { combineReducers } from 'redux';

import comReducer from './company';
import userReducer from './user';

const appReducer = combineReducers({
	company: comReducer,
	user: userReducer,
});

export default appReducer;
