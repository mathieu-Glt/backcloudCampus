/**
 * @fileoverview Contrôleur gérant les opérations sur les films
 */

const BaseController = require("./BaseController");
const MovieService = require("../services/MovieService");

/**
 * Contrôleur pour la gestion des films
 */
class MovieController extends BaseController {
  /**
   * @param {MovieService} movieService - Service de gestion des films
   */
  constructor(movieService) {
    super();
    if (!movieService) {
      throw new Error("movieService est requis");
    }
    this.movieService = movieService;
  }

  /**
   * Récupère tous les films
   */
  async getAllMovies(req, res) {
    try {
      const movies = await this.movieService.getAllMovies();
      this.sendSuccess(res, 200, movies);
    } catch (error) {
      this.sendError(res, 500, "Erreur lors de la récupération des films");
    }
  }

  /**
   * Récupère un film par son ID
   */
  async getMovieById(req, res) {
    try {
      const movie = await this.movieService.getMovieById(req.params.id);
      if (!movie) {
        return this.sendError(res, 404, "Film non trouvé");
      }
      this.sendSuccess(res, 200, movie);
    } catch (error) {
      this.sendError(res, 500, "Erreur lors de la récupération du film");
    }
  }

  /**
   * Récupère un film par son slug
   */
  async getMovieBySlug(req, res) {
    try {
      const movie = await this.movieService.getMovieBySlug(req.params.slug);
      if (!movie) {
        return this.sendError(res, 404, "Film non trouvé");
      }
      this.sendSuccess(res, 200, movie);
    } catch (error) {
      this.sendError(res, 500, "Erreur lors de la récupération du film");
    }
  }

  /**
   * Récupère un film par son titre
   */
  async getMovieByTitle(req, res) {
    try {
      const movie = await this.movieService.getMovieByTitle(req.params.title);
      if (!movie) {
        return this.sendError(res, 404, "Film non trouvé");
      }
      this.sendSuccess(res, 200, movie);
    } catch (error) {
      this.sendError(res, 500, "Erreur lors de la récupération du film");
    }
  }

  /**
   * Récupère des films par genre
   */
  async getMoviesByGenre(req, res) {
    try {
      const movies = await this.movieService.getMoviesByGenre(req.params.genre);
      this.sendSuccess(res, 200, movies);
    } catch (error) {
      this.sendError(res, 500, "Erreur lors de la récupération des films");
    }
  }

  /**
   * Crée un nouveau film
   */
  async createMovie(req, res) {
    try {
      const movie = await this.movieService.createMovie(req.body);
      this.sendSuccess(res, 201, movie);
    } catch (error) {
      this.sendError(res, 500, "Erreur lors de la création du film");
    }
  }

  /**
   * Met à jour un film existant
   */
  async updateMovie(req, res) {
    try {
      const movie = await this.movieService.updateMovie(
        req.params.id,
        req.body
      );
      if (!movie) {
        return this.sendError(res, 404, "Film non trouvé");
      }
      this.sendSuccess(res, 200, movie);
    } catch (error) {
      this.sendError(res, 500, "Erreur lors de la mise à jour du film");
    }
  }

  /**
   * Supprime un film
   */
  async deleteMovie(req, res) {
    try {
      const success = await this.movieService.deleteMovie(req.params.id);
      if (!success) {
        return this.sendError(res, 404, "Film non trouvé");
      }
      this.sendSuccess(res, 200, { message: "Film supprimé avec succès" });
    } catch (error) {
      this.sendError(res, 500, "Erreur lors de la suppression du film");
    }
  }

  async updateMovieRate(req, res) {
    try {
      const { rate } = req.body;
      const movie = await this.movieService.updateMovieRate(
        req.params.id,
        rate
      );
      if (!movie) {
        return this.sendError(res, 404, "Film non trouvé");
      }
      this.sendSuccess(res, 200, movie);
    } catch (error) {
      this.sendError(res, 500, "Erreur lors de la mise à jour de la note");
    }
  }
}

module.exports = new MovieController();
