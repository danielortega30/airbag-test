const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  tournamentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tournament', required: true },
  player1: { type: String, required: true },
  player2: { type: String, required: true },
  status: { type: String, enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'TIMEOUT'], default: 'PENDING' },
  winner: { type: String },
  score: {
    player1Score: { type: Number, default: 0 },
    player2Score: { type: Number, default: 0 }
  },
  startTime: { type: Date },
  timeLimit: { type: Number, required: true },
  completedAt: { type: Date }
});

module.exports = mongoose.model('Match', matchSchema);