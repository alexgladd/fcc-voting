// api abstraction
// use native fetch for requests

import { buildInit, buildAuthInit, apiRequest } from './apihelpers';

// request server state
const getServerState = async () => {
  return await apiRequest('/api/serverstate', buildInit());
}

// finish oauth authentication
const oauthAuthenticate = async (network, code) => {
  const init = buildInit({
    method: 'POST',
    body: JSON.stringify({ code })
  });

  return await apiRequest(`/api/authenticate/${network}`, init);
}

// retrieve all polls
const getAllPolls = async () => {
  return await apiRequest('/api/polls', buildInit());
}

// retrieve poll details
const getPollDetails = async (pollId) => {
  return await apiRequest(`/api/poll/${pollId}`, buildInit());
}

// vote on poll
const voteOnPoll = async (pollId, vote) => {
  const init = buildInit({
    method: 'POST',
    body: JSON.stringify(vote)
  });

  return await apiRequest(`/api/poll/${pollId}/vote`, init);
}

// retrieve user's polls
const getUserPolls = async (user) => {
  return await apiRequest(`/api/user/${user.id}/polls`, buildAuthInit(user.token));
}

// create a new poll
const createPoll = async (user, poll) => {
  const init = buildAuthInit(user.token, {
    method: 'POST',
    body: JSON.stringify(poll)
  });

  return await apiRequest(`/api/user/${user.id}/poll`, init);
}

// edit a poll
const updatePoll = async (user, poll, options) => {
  const init = buildAuthInit(user.token, {
    method: 'PUT',
    body: JSON.stringify(options)
  });

  return await apiRequest(`/api/user/${user.id}/poll/${poll.id}`, init);
}

// example api endpoints (remove)
const getAuthenticatedExample = async (token) => {
  return await apiRequest('/api/example', buildAuthInit(token));
}

const getAuthorizedExample = async (user) => {
  return await apiRequest(`/api/user/${user.id}/example`, buildAuthInit(user.token));
}
// example api endpoints (remove)

export default {
  getServerState,
  oauthAuthenticate,
  getAllPolls,
  getUserPolls,
  getPollDetails,
  voteOnPoll,
  createPoll,
  updatePoll,
  getAuthenticatedExample,
  getAuthorizedExample
};
