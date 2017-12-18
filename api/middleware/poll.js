// poll middleware

const { Poll } = require('../models');

exports.lookupPoll = async (req, res, next) => {
  const { pollId } = req.params;

  try {
    const poll = await Poll.findById(pollId).exec();
    if (!poll) {
      throw new Error('Invalid poll ID');
    }

    req.poll = poll;
    next();
  } catch(err) {
    console.error('Error retrieving poll details', err);
    res.status(500).json({ errorMessage: 'Could not retrieve poll details' });
  }
}

exports.authorizePollOwnership = (req, res, next) => {
  const { authUser, poll } = req;

  if (authUser && poll && (authUser.id === poll.owner.id)) {
    next();
  } else {
    res.status(401).json({ errorMessage: 'Not authorized' });
  }
}
