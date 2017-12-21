// all polls reducer

import { PollsActions } from '../actions/polls';

const pollsReducer = (state=[], action) => {
  switch (action.type) {
    case PollsActions.all:
      return [ ...action.polls ];

    default:
      return state;
  }
}

export default pollsReducer;
