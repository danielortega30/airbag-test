
const Match = require('../models/Match');

exports.crearPartida = async (data) => {
  const match = new Match(data);
  await match.save();
  return partida;
};

exports.registrarResultado = async (id, data) => {
  const match = await Match.findById(id).exec();
  match.status = 'COMPLETED';
  match.winner = data.winner;
  match.score = data.score;
  await match.save();
  return match;
};
