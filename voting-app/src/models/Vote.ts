import mongoose from 'mongoose';

const VoteSchema = new mongoose.Schema({
  upvotes: {
    type: Number,
    default: 0,
  },
  downvotes: {
    type: Number,
    default: 0,
  },
  totalVotes: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// Calculate total votes before saving
VoteSchema.pre('save', function(next) {
  this.totalVotes = this.upvotes + this.downvotes;
  next();
});

export default mongoose.models.Vote || mongoose.model('Vote', VoteSchema);