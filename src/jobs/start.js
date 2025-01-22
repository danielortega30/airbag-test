const schedule = require('node-schedule');


exports.scheduleTournamentJob = (tournament) => {
  const startDate = new Date(tournament.startDate);

  if (startDate <= new Date()) {
    console.log(`La fecha de inicio para el torneo ${tournament.name} ya pasó. No se programará.`);
    return;
  }

    schedule.scheduleJob(startDate, async () => {
    console.log(`Ejecutando inicio programado para el torneo: ${tournament.name}`);

    tournament.status = 'IN_PROGRESS';
    await tournament.save();

    await Match.updateMany(
      { tournamentId: tournament._id },
      { status: 'IN_PROGRESS' }
    );

    console.log(`Torneo "${tournament.name}" y sus partidas pasaron a IN_PROGRESS.`);
  });

  console.log(`Job programado para el torneo "${tournament.name}" a las ${startDate}.`);
};
