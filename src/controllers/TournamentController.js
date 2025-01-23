
const { scheduleTournamentJob } = require('../jobs/start');
const Match = require('../models/Match');
const Tournament = require('../models/Tournament');
const { tournamentValidationSchema } = require('../validation/tournamentValidation');


exports.makeTournament =  async (req, res) => {
  try {

    const { error, value } = tournamentValidationSchema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        message: 'Error de validación',
        details: error.details.map((detail) => detail.message),
      });
    }

    const tournament = new Tournament(value);
    await tournament.save();

    scheduleTournamentJob(tournament);

    res.status(201).json(tournament);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

exports.getTournaments = async (req, res) => {
  try {

    const { status, startDate } = req.query; 

    let filter = {};

    if (status) {
      filter.status = status; 
    }

    if (startDate) {
      const startDateObj = new Date(startDate);
      if (!isNaN(startDateObj.getTime())) { 
        filter.startDate = { $gte: startDateObj }; 
      } else {
        return res.status(400).json({ error: 'Formato de fecha inválido' });
      }
    }
    
    const tournaments = await Tournament.find(filter);
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