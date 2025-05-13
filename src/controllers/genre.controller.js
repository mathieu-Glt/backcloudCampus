/**
 * @fileoverview Contrôleur gérant les opérations sur les genres
 */

const BaseController = require("./BaseController");
const GenreService = require("../services/GenreService");

class GenreController extends BaseController {
  /**
   * @param {GenreService} genreService - Service de gestion des genres
   */
  constructor(genreService) {
    q;
    super();
    if (!genreService) {
      throw new Error("genreService est requis");
    }
    this.genreService = genreService;
  }

  async getAllGenres(req, res) {
    try {
      const genres = await this.genreService.getAllGenres();
      this.sendSuccess(res, 200, genres);
    } catch (error) {
      this.sendError(res, 500, "Erreur lors de la récupération des genres");
    }
  }

  async getGenreById(req, res) {
    try {
      const genre = await this.genreService.getGenreById(req.params.id);
      if (!genre) {
        return this.sendError(res, 404, "Genre non trouvé");
      }
      this.sendSuccess(res, 200, genre);
    } catch (error) {
      this.sendError(res, 500, "Erreur lors de la récupération du genre");
    }
  }

  async createGenre(req, res) {
    try {
      const genre = await this.genreService.createGenre(req.body);
      this.sendSuccess(res, 201, genre);
    } catch (error) {
      this.sendError(res, 500, "Erreur lors de la création du genre");
    }
  }

  async updateGenre(req, res) {
    try {
      const genre = await this.genreService.updateGenre(
        req.params.id,
        req.body
      );
      this.sendSuccess(res, 200, genre);
    } catch (error) {
      this.sendError(res, 500, "Erreur lors de la mise à jour du genre");
    }
  }

  async deleteGenre(req, res) {
    try {
      const genre = await this.genreService.deleteGenre(req.params.id);
      if (!genre) {
        return this.sendError(res, 404, "Genre non trouvé");
      }
      this.sendSuccess(res, 200, genre);
    } catch (error) {
      this.sendError(res, 500, "Erreur lors de la suppression du genre");
    }
  }
}

module.exports = GenreController;
