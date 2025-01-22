const Joi = require('joi');

const tournamentValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'El nombre debe ser un texto.',
    'any.required': 'El nombre es obligatorio.',
  }),
  startDate: Joi.date().greater('now').required().messages({
    'date.base': 'La fecha de inicio debe ser una fecha válida.',
    'date.greater': 'La fecha de inicio debe ser una fecha futura.',
    'any.required': 'La fecha de inicio es obligatoria.',
  }),
  status: Joi.string().valid('PENDING', 'IN_PROGRESS', 'COMPLETED').default('PENDING').messages({
    'string.base': 'El estado debe ser un texto válido.',
    'any.only': 'El estado debe ser uno de los valores permitidos: PENDING, IN_PROGRESS, COMPLETED.',
  }),
  participants: Joi.number().integer().positive().required().messages({
    'number.base': 'El número de participantes debe ser un número entero.',
    'number.positive': 'El número de participantes debe ser mayor a 0.',
    'any.required': 'El número de participantes es obligatorio.',
  }),
  matches: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)).messages({
    'string.pattern.base': 'Cada ID de partida debe ser un ObjectId válido.',
  }),
});

module.exports = { tournamentValidationSchema };
