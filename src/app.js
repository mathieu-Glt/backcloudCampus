require("./models/associations");

const Genre = require("./models/genre.model");
const Movie = require("./models/movie.model");

// Initialiser les relations
const models = { Genre, Movie };
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});
