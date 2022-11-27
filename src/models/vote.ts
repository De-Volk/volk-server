import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CandidateSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  selection: { type: String, require: true },
});

const VoteSchema = new Schema({
  id: { type: String, required: true, unique: true, maxlength: 20 },
  publisher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  candidates: [CandidateSchema],
  content: { type: String, require: true },
  option1: { type: String, require: true },
  option2: { type: String, require: true },
  endDate: { type: Date, default: new Date() },
  createdAt: { type: Date, default: new Date() },
  updateAt: { type: Date, default: new Date() },
});

const Vote = mongoose.models.Vote || mongoose.model('Vote', VoteSchema);

export default Vote;
