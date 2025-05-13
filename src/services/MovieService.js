const IMovieService = require("../interfaces/IMovieService");

class MovieService extends IMovieService {
  /**
   * @param {Object} movieRepository - Repository pour l'accès aux données des films
   */
  constructor(movieRepository) {
    super();
    if (!movieRepository) {
      throw new Error("movieRepository est requis");
    }
    this.movieRepository = movieRepository;
  }

  async getAllMovies() {
    return await this.movieRepository.findAll({
      include: ["genre", "director", "actors", "characters"],
    });
  }

  async getMovieById(id) {
    return await this.movieRepository.findByPk(id, {
      include: ["genre", "director", "actors", "characters"],
    });
  }

  async getMovieByTitle(title) {
    return await this.movieRepository.findOne({
      where: { title },
      include: ["genre", "director", "actors", "characters"],
    });
  }

  async getMoviesByGenre(genre) {
    return await this.movieRepository.findAll({
      include: [
        {
          model: "genre",
          where: { name: genre },
        },
        "director",
        "actors",
        "characters",
      ],
    });
  }

  async getMovieBySlug(slug) {
    return await this.movieRepository.findOne({
      where: { slug },
      include: ["genre", "director", "actors", "characters"],
    });
  }

  async getBestMovies() {
    return await this.movieRepository.findAll({
      order: [["rate", "DESC"]],
      limit: 10,
      include: ["genre", "director", "actors", "characters"],
    });
  }

  async getWorstMovies() {
    return await this.movieRepository.findAll({
      order: [["rate", "ASC"]],
      limit: 10,
      include: ["genre", "director", "actors", "characters"],
    });
  }

  async getLatestMovies() {
    return await this.movieRepository.findAll({
      order: [["createdAt", "DESC"]],
      limit: 10,
      include: ["genre", "director", "actors", "characters"],
    });
  }

  async getRandomMovies() {
    return await this.movieRepository.findAll({
      order: [["id", "DESC"]],
      limit: 10,
      include: ["genre", "director", "actors", "characters"],
    });
  }

  async createMovie(movieData) {
    const { genreId, director, actors, characters, ...movieInfo } = movieData;

    const movie = await this.movieRepository.create({
      ...movieInfo,
      genreId,
    });

    // Gestion des relations
    if (director) {
      await movie.setDirector(director);
    }
    if (actors) {
      await movie.setActors(actors);
    }
    if (characters) {
      await movie.setCharacters(characters);
    }

    // Retourne le film avec ses relations
    return await this.movieRepository.findByPk(movie.id, {
      include: ["genre", "director", "actors", "characters"],
    });
  }

  async updateMovie(id, movieData) {
    const { genreId, director, actors, characters, ...movieInfo } = movieData;

    const movie = await this.movieRepository.findByPk(id);
    if (!movie) {
      return null;
    }

    // Mise à jour des informations de base
    await this.movieRepository.update(
      {
        ...movieInfo,
        genreId,
      },
      {
        where: { id },
      }
    );

    // Mise à jour des relations
    if (director) {
      await movie.setDirector(director);
    }
    if (actors) {
      await movie.setActors(actors);
    }
    if (characters) {
      await movie.setCharacters(characters);
    }

    // Retourne le film mis à jour avec ses relations
    return await this.movieRepository.findByPk(id, {
      include: ["genre", "director", "actors", "characters"],
    });
  }

  async deleteMovie(id) {
    const movie = await this.movieRepository.findByPk(id, {
      include: ["genre", "director", "actors", "characters"],
    });

    if (!movie) {
      return false;
    }

    await this.movieRepository.destroy({
      where: { id },
    });
    return true;
  }

  async updateMovieRate(id, rate) {
    const movie = await this.movieRepository.findByPk(id);
    if (!movie) return null;
    return await this.movieRepository.update({ rate }, { where: { id } });
  }
}

module.exports = MovieService;
