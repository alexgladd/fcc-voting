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
  getPollDetails,
  getAuthenticatedExample,
  getAuthorizedExample
};
