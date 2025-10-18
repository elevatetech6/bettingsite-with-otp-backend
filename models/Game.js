const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  odds: {
    teamA: {
      type: Number,
      required: true,
    },
    draw: {
      type: Number,
      required: true,
    },
    teamB: {
      type: Number,
      required: true,
    },
  },
  result: {
    type: String, // 'teamA', 'draw', 'teamB'
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Game', GameSchema);