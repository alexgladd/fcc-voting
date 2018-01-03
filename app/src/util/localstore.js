// local storage for persisting user data

const USER_INFO_KEY = 'mern_app_user_info';
const VOTES_KEY = 'voting_app_user_votes';

const setUserInfo = (userInfo) => {
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
}

const clearUserInfo = () => {
  localStorage.removeItem(USER_INFO_KEY);
}

const getUserInfo = () => {
  try {
    return JSON.parse(localStorage.getItem(USER_INFO_KEY));
  } catch(e) {
    return null;
  }
}

const setUserVotes = (votes) => {
  localStorage.setItem(VOTES_KEY, JSON.stringify(votes));
}

const getUserVotes = () => {
  try {
    return JSON.parse(localStorage.getItem(VOTES_KEY));
  } catch(e) {
    return null;
  }
}

export default {
  setUserInfo,
  clearUserInfo,
  getUserInfo,
  setUserVotes,
  getUserVotes
};
