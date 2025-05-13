const IGenreService = require("../interfaces/IGenreService");

class GenreService extends IGenreService {
  /**
   * @param {Object} genreRepository - Repository pour l'accès aux données des genres
   */
  constructor(genreRepository) {
    super();

    if (!genreRepository) {
      throw new Error("genreRepository est requis");
    }
    this.genreRepository = genreRepository;
  }

  async getAllGenres() {
    return await this.genreRepository.findAll();
  }

  async getGenreById(id) {
    return await this.genreRepository.findByPk(id);
  }

  async createGenre(genreData) {
    return await this.genreRepository.create(genreData);
  }

  async updateGenre(id, genreData) {
    return await this.genreRepository.update(genreData, {
      where: { id },
    });
  }

  async deleteGenre(id) {
    return await this.genreRepository.destroy({
      where: { id },
    });
  }
}

module.exports = GenreService;
