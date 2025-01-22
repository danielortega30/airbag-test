
const Torneo = require('../models/Torneo');

exports.crearTorneo = async (data) => {
  const torneo = new Torneo(data);
  await torneo.save();
  return torneo;
};

exports.listarTorneos = async () => {
  const torneos = await Torneo.find().exec();
  return torneos;
};

