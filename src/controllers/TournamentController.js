
const { scheduleTournamentJob } = require('../jobs/start');
const Match = require('../models/Match');
const Tournament = require('../models/Tournament');


exports.makeTournament =  async (req, res) => {
  try {
    const tournament = new Tournament(req.body);
    await tournament.save();

    startQueue.add({ torneoId: tournament._id, startDate: tournament.startDate });
    scheduleTournamentJob(tournament);

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





exports.checkAndUpdatePendingTournaments = async () => {
  try {
    const now = new Date();
    const pendingTournaments = await Tournament.find({ status: 'PENDING', startDate: { $lte: now } }).populate('matches');

    if (pendingTournaments.length === 0) {
      console.log('No hay torneos pendientes para iniciar.');
      return;
    }

    console.log(`Se encontraron ${pendingTournaments.length} torneos en estado PENDING listos para iniciar.`);

    for (const tournament of pendingTournaments) {
      tournament.status = 'IN_PROGRESS';
      await tournament.save();
      console.log(`Torneo ${tournament.name} actualizado a IN_PROGRESS.`);

      if (tournament.matches && tournament.matches.length > 0) {
        for (const matchId of tournament.matches) {
          const match = await Match.findById(matchId);
          if (match && match.status === 'PENDING') {
            match.status = 'IN_PROGRESS';
            match.startTime = now;
            await match.save();
            console.log(`Partida ${match._id} asociada al torneo ${tournament.name} actualizada a IN_PROGRESS.`);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error al verificar y actualizar los torneos pendientes:', error.message);
  }
};