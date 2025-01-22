const Match = require('../models/Match');

exports.makeMatch = async (req, res) => {
  try {

    const { player1, player2 } = req.body;

    const existingMatch = await Match.findOne({
      $or: [
        { player1: player1, status: { $in: ['PENDING', 'IN_PROGRESS'] } },
        { player2: player1, status: { $in: ['PENDING', 'IN_PROGRESS'] } },
        { player1: player2, status: { $in: ['PENDING', 'IN_PROGRESS'] } },
        { player2: player2, status: { $in: ['PENDING', 'IN_PROGRESS'] } }
      ]
    });

    if (existingMatch) {
      return res.status(400).json({
        error: `Uno de los jugadores ya está participando en otra partida activa: Jugador ${
          existingMatch.player1 === player1 || existingMatch.player2 === player1
            ? player1
            : player2
        }`
      });
    }

    const match = new Match(req.body);
    await match.save();
    res.status(201).json(match);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



exports.updateMatch = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);

    if (!match) {
      return res.status(404).json({ error: 'Match no encontrado.' });
    }

    if (match.status !== 'PENDING') {
      return res.status(400).json({
        error: 'Solo se pueden actualizar partidas en estado PENDING.'
      });
    }

    const updatedMatch = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedMatch);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



exports.checkAndUpdatePendingMatches = async () => {
  try {
    const now = new Date();
    const pendingMatches = await Match.find({ status: 'IN_PROGRESS' });

    if (pendingMatches.length === 0) {
      console.log('No hay partidas en progreso en este momento.');
      return;
    }

    console.log(`Se encontraron ${pendingMatches.length} partidas en estado IN_PROGRESS.`);

    for (const match of pendingMatches) {
      const matchEndTime = new Date(match.startTime.getTime() + match.timeLimit * 60000); 

      if (now > matchEndTime) {
        match.status = 'TIMEOUT';
        match.completedAt = now;
        await match.save();
        console.log(`Partida ${match._id} actualizada a TIMEOUT.`);
      }
    }
  } catch (error) {
    console.error('Error al verificar y actualizar los partidos pendientes:', error.message);
  }
};