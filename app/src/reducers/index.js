// reducers main
import { combineReducers } from 'redux';
import user from './user';
import serverState from './serverstate';
import polls from './polls';
import votes from './votes';

const appReducers = combineReducers({
  user,
  polls,
  votes,
  serverState
});

export default appReducers;
