const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  status: { type: String, enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED'], default: 'PENDING' },
  participants: { type: Number, required: true },
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Match' }]
});

module.exports = mongoose.model('Tournament', tournamentSchema);