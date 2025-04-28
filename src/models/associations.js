const Genre = require("./genre.model");
const Movie = require("./movie.model");

// Définir les relations
Genre.hasMany(Movie, {
  foreignKey: "genreId",
  as: "movies",
});

Movie.belongsTo(Genre, {
  foreignKey: "genreId",
  as: "genre",
});

module.exports = {
  Genre,
  Movie,
};
