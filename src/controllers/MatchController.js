const Match = require('../models/Match');

exports.makeMatch = async (req, res) => {
  try {
    const match = new Match(req.body);
    await match.save();
    res.status(201).json(match);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



exports.updateMatch=  async (req, res) => {
  try {
    const match = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(match);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}