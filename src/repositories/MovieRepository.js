const IMovieRepository = require("../interfaces/IMovieRepository");
const { Movie } = require("../models/movie.model");

class MovieRepository extends IMovieRepository {
  async findAll(options) {
    return await Movie.findAll(options);
  }

  async findByPk(id, options) {
    return await Movie.findByPk(id, options);
  }

  async findOne(options) {
    return await Movie.findOne(options);
  }

  async create(data) {
    return await Movie.create(data);
  }

  async update(data, options) {
    return await Movie.update(data, options);
  }

  async destroy(options) {
    return await Movie.destroy(options);
  }
}

module.exports = MovieRepository;
