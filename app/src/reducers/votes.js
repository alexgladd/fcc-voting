// user votes reducer

import { VoteActions } from '../actions/votes';
import store from '../util/localstore';

const votesReducer = (state={}, action) => {
  switch(action.type) {
    case VoteActions.vote:
      const newState = { ...state };
      newState[action.vote.pollId] = action.vote.optionId;
      store.setUserVotes(newState);
      return newState;

    case VoteActions.allVotes:
      return { ...action.votes };

    default:
      return state;
  }
}

export default votesReducer;
