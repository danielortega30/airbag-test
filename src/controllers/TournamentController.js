
const Tournament = require('../models/Tournament');

exports.makeTournament =  async (req, res) => {
  try {
    const tournament = new Tournament(req.body);
    await tournament.save();

    startQueue.add({ torneoId: tournament._id, startDate: tournament.startDate });

    res.status(201).json(tournament);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

exports.getTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find().populate('matches');
    res.status(200).json(tournaments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}