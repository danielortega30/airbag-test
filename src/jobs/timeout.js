const Match = require('../models/Match');

const checkTimeouts = async () => {
  const now = new Date();
  const matches = await Match.find({ status: 'IN_PROGRESS' });

  for (const match of matches) {
    const timeElapsed = (now - match.startTime) / 60000;

    if (timeElapsed > match.timeLimit) {
      match.status = 'TIMEOUT';
      match.completedAt = now;
      await match.save();
      console.log(`Match ${match._id} timed out.`);
    }
  }
};

module.exports = checkTimeouts;