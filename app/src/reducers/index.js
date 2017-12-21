// reducers main
import { combineReducers } from 'redux';
import user from './user';
import serverState from './serverstate';
import polls from './polls';

const appReducers = combineReducers({
  user,
  polls,
  serverState
});

export default appReducers;
