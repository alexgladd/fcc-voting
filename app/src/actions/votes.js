// user votes actions

import api from '../util/api';

export const VoteActions = {
  vote: 'VOTE',
  allVotes: 'ALL_VOTES'
};

export const addVote = (vote) => ({
  type: VoteActions.vote,
  vote
});

export const loadAllVotes = (votes) => ({
  type: VoteActions.allVotes,
  votes
});

export const submitVote = (pollId, vote) => {
  return async (dispatch) => {
    try {
      await api.voteOnPoll(pollId, vote);
      dispatch(addVote({ pollId, ...vote }));
    } catch(err) {
      console.error('Error voting on poll', err);
    }
  };
}
