// poll model

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const pollOptionSchema = new mongoose.Schema({
  value: { type: String, required: true, trim: true }
});

const pollVoteSchema = new mongoose.Schema({
  optionId: { type: ObjectId, required: true }
}, {
  timestamps: true,
  _id: false
});

const pollOwnerSchema = new mongoose.Schema({
  id:   { type: ObjectId, required: true, get: i => i.toString() },
  name: { type: String, required: true }
}, {
  _id: false
});

const pollSchema = new mongoose.Schema({
  subject: { type: String, required: true, trim: true },
  options: [ pollOptionSchema ],
  votes:   [ pollVoteSchema ],
  owner:   { type: pollOwnerSchema, required: true }
}, {
  timestamps: true
});

pollSchema.methods.toPollResponse = function() {
  const optionsResponse = this.options.map(option => ({ id: option.id, value: option.value }));
  const votesResponse = this.votes.map(vote => ({ optionId: vote.optionId, createdAt: vote.createdAt }));

  return {
    id: this.id,
    subject: this.subject,
    options: optionsResponse,
    votes: votesResponse,
    owner: this.owner,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
}

module.exports = mongoose.model('Poll', pollSchema);