const mongoose = require('mongoose');

const BetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: true,
  },
  betAmount: {
    type: Number,
    required: true,
  },
  betOn: {
    type: String, // 'teamA', 'draw', 'teamB'
    required: true,
  },
  potentialPayout: {
    type: Number,
  },
  isSettled: {
    type: Boolean,
    default: false,
  },
  isWon: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Bet', BetSchema);