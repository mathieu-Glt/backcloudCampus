/**
 * Repository pour les genres
 */
const IGenreRepository = require("../interfaces/IGenreRepository");
const { Genre } = require("../models/genre.model");

class GenreRepository extends IGenreRepository {
  constructor(db) {
    super();
    this.db = db;
  }

  async findAll(options) {
    return await Genre.findAll(options);
  }

  async findByPk(id, options) {
    return await Genre.findByPk(id, options);
  }

  async create(genreData) {
    return await Genre.create(genreData);
  }

  async update(id, genreData) {
    return await Genre.update(genreData, { where: { id } });
  }

  async destroy(id, options) {
    return await Genre.destroy({ where: { id }, ...options });
  }
}

module.exports = GenreRepository;
