const Joi = require("joi");

/**
 * Schéma de validation pour un film
 */
const movieSchema = Joi.object({
  title: Joi.string().required().min(1).max(255),
  description: Joi.string().required().min(1),
  releaseDate: Joi.date().required(),
  duration: Joi.number().integer().min(1).required(),
  rating: Joi.number().min(0).max(10).default(0),
  posterUrl: Joi.string().uri().allow(null, ""),
  trailerUrl: Joi.string().uri().allow(null, ""),
  genres: Joi.array().items(Joi.string()).min(1).required(),
  director: Joi.string().required(),
  actors: Joi.array().items(Joi.string()).min(1).required(),
  language: Joi.string().required(),
  country: Joi.string().required(),
  isActive: Joi.boolean().default(true),
});

/**
 * Valide les données d'un film
 * @param {Object} data - Les données du film à valider
 * @returns {Object} - Résultat de la validation
 */
const validateMovie = (data) => {
  return movieSchema.validate(data, { abortEarly: false });
};

module.exports = {
  validateMovie,
  movieSchema,
};
