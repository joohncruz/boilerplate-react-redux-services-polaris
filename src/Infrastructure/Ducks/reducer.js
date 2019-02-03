import { combineReducers } from 'redux';

import auth, { DUCK_NAME as AUTH_DUCK_NAME } from './Auth';
import list, { DUCK_NAME as LIST_DUCK_NAME } from './List';

const reducers = {
  [AUTH_DUCK_NAME]: auth,
  [LIST_DUCK_NAME]: list,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
