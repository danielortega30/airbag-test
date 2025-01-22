const Joi = require('joi');

const matchValidationSchema = Joi.object({
  tournamentId: Joi.string().hex().length(24).required(), 
  player1: Joi.string().required(),
  player2: Joi.string().required(),
  status: Joi.string().valid('PENDING', 'IN_PROGRESS', 'COMPLETED', 'TIMEOUT').default('PENDING'),
  winner: Joi.string().allow(null), 
  score: Joi.object({
    player1Score: Joi.number().default(0),
    player2Score: Joi.number().default(0)
  }).default({ player1Score: 0, player2Score: 0 }),
  startTime: Joi.date().allow(null),
  timeLimit: Joi.number().required(),
  completedAt: Joi.date().allow(null) 
});

module.exports = { matchValidationSchema };