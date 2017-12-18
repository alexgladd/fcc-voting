// poll controller

const { Poll, User } = require('../models');

exports.getAllPolls = async (req, res) => {
  try {
    const polls = await Poll.find().sort({ createdAt: 'desc' }).exec();
    const response = polls.map(poll => ({
      id: poll.id,
      subject: poll.subject,
      voteCount: poll.votes.length,
      ownerName: poll.owner.name,
      createdAt: poll.createdAt
    }));

    res.json(response);
  } catch(err) {
    console.error('Error retrieving all polls', err);
    res.status(500).json({ errorMessage: 'Could not retrieve all polls' });
  }
}

exports.getPoll = (req, res) => {
  const { poll } = req;

  res.json(poll.toPollResponse());
}

exports.createVoteOnPoll = async (req, res) => {
  let { poll } = req;
  const { body } = req;

  try {
    poll.votes.push({ ...body });
    poll = await poll.save();

    res.status(201).json(poll.toPollResponse());
  } catch(err) {
    console.error('Error creating new vote on poll', err);
    res.status(500).json({ errorMessage: 'Could not create new vote on poll' });
  }
}

exports.getUserPolls = async (req, res) => {
  const { authUser } = req;

  try {
    const polls = await Poll.find({ 'owner.id': authUser.id }).sort({ updatedAt: 'desc' }).exec();
    const response = polls.map(poll => poll.toPollResponse());

    res.json(response);
  } catch(err) {
    console.error('Error retrieving all polls for user', err);
    res.status(500).json({ errorMessage: 'Could not retrieve user polls' });
  }
}

exports.createNewPoll = async (req, res) => {
  const { authUser, body } = req;
  const owner = {
    id: authUser.id,
    name: authUser.name
  };

  try {
    let poll = new Poll({ ...body, owner });
    poll = await poll.save();

    res.status(201).json(poll.toPollResponse());
  } catch(err) {
    console.error('Error creating new poll', err);
    res.status(500).json({ errorMessage: 'Could not create new poll' });
  }
}

exports.updatePoll = async (req, res) => {
  let { poll } = req;
  const { body } = req;

  const options = body.options.map(option => {
    if (option.id) {
      return { _id: option.id, value: option.value };
    } else {
      return { value: option.value };
    }
  });

  try {
    poll.options = options;
    poll = await poll.save();

    res.status(201).json(poll.toPollResponse());
  } catch(err) {
    console.error('Error updating poll', err);
    res.status(500).json({ errorMessage: 'Could not update poll' });
  }
}

exports.deletePoll = async (req, res) => {
  const { poll } = req;

  try {
    const remPoll = await Poll.findByIdAndRemove(poll.id).exec();

    res.status(204).end();
  } catch(err) {
    console.error('Error deleting poll', err);
    res.status(500).json({ errorMessage: 'Could not remove poll' });
  }
}
