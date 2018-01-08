// poll model

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const pollOptionSchema = new mongoose.Schema({
  value: { type: String, required: true, trim: true },
  votes: { type: Number, require: true, default: 0 }
});

const pollOwnerSchema = new mongoose.Schema({
  id:   { type: ObjectId, required: true, get: i => i.toString() },
  name: { type: String, required: true }
}, {
  _id: false
});

const pollSchema = new mongoose.Schema({
  subject:   { type: String, required: true, trim: true },
  options:   [ pollOptionSchema ],
  voteCount: { type: Number, required: true, default: 0 },
  owner:     { type: pollOwnerSchema, required: true }
}, {
  timestamps: true
});

pollSchema.methods.toPollResponse = function() {
  const optionsResponse = this.options.map(option => ({ id: option.id, value: option.value, votes: option.votes }));

  return {
    id: this.id,
    subject: this.subject,
    options: optionsResponse,
    voteCount: this.voteCount,
    owner: this.owner,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
}

module.exports = mongoose.model('Poll', pollSchema);
