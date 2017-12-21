// all polls actions

import api from '../util/api';

export const PollsActions = {
  all: 'ALL_POLLS'
};

export const allPolls = (polls) => ({
  type: PollsActions.all,
  polls
});

export const requestAllPolls = () => {
  return async (dispatch) => {
    try {
      const polls = await api.getAllPolls();
      dispatch(allPolls(polls));
    } catch(err) {
      console.error('Error requesting all polls', err);
    }
  };
}
