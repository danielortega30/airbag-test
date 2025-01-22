const Bull = require('bull');
const Tournament = require('../models/Tournament');

const startQueue = new Bull('startAutomatically');

startQueue.process(async (job) => {
  const torneo = await Tournament.findById(job.data.torneoId).populate('matches');
  if (torneo && new Date(torneo.startDate).toDateString() === new Date().toDateString()) {
    torneo.status = 'IN_PROGRESS';
    await torneo.save();
    console.log(`Tournament ${torneo.name} started.`);
  }
});

module.exports = startQueue;