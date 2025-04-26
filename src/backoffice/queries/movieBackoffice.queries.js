const Movie = require("../../models/movie.model");

// Méthodes CRUD

// create movie
const createMovie = async (movieData) => {
  return await Movie.create(movieData);
};

// update movie
const updateMovie = async (id, movieData) => {
  const movie = await Movie.findByPk(id);
  if (!movie) return null;

  await movie.update(movieData);
  return movie;
};

// delete movie and return movie deleted
const deleteMovie = async (id) => {
  const movie = await Movie.findByPk(id);
  if (!movie) return null;

  await movie.destroy();
  return movie;
};

//Mise à jour de la note d'un film
const updateMovieRate = async (id, rate) => {
  const movie = await Movie.findByPk(id);
  if (!movie) return null;

  await movie.update({ rate });
  return movie;
};

module.exports = {
  createMovie,
  updateMovie,
  deleteMovie,
  updateMovieRate,
};
