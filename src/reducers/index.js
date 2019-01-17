import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { createReducer } from 'actionReducer/reducer';
// import users from './users';
// import counter from './counter';

export default combineReducers({
  auth: authReducer,
  layout: createReducer(['layout'])
});