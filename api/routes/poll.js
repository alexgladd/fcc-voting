// routes for polls

const { PollController } = require('../controllers');
const poll = require('../middleware/poll');
const auth = require('../middleware/auth');

const setupPollRoutes = (router) => {
  router.route('/polls')
    .get(PollController.getAllPolls);

  router.route('/poll/:pollId')
    .all(poll.lookupPoll)
    .get(PollController.getPoll);

  router.route('/poll/:pollId/vote')
    .all(poll.lookupPoll)
    .post(PollController.createVoteOnPoll);

  router.route('/user/:userId/poll')
    .all(auth.authenticateUser, auth.authorizeUser)
    .post(PollController.createNewPoll);

  router.route('/user/:userId/poll/:pollId')
    .all(auth.authenticateUser, auth.authorizeUser, poll.lookupPoll, poll.authorizePollOwnership)
    .put(PollController.updatePoll)
    .delete(PollController.deletePoll);
}

module.exports = setupPollRoutes;
