const cron = require('node-cron');
const { checkAndUpdatePendingMatches } = require('../controllers/MatchController');

cron.schedule('*/5 * * * *', async () => {
  console.log('Iniciando verificación de partidas pendientes...');
  await checkAndUpdatePendingMatches();
});