const xss = require("xss");
const path = require("path");
const {
  getAllMovies: getAllMoviesQuery,
  getMovieById: getMovieByIdQuery,
  getMovieByTitle: getMovieByTitleQuery,
  getMovieBySlug: getMovieBySlugQuery,
  getBestMovies: getBestMoviesQuery,
  getWorstMovies: getWorstMoviesQuery,
  getLatestMovies: getLatestMoviesQuery,
  getRandomMovies: getRandomMoviesQuery,
} = require("../queries/movie.queries");

// Récupérer tous les films
const getAllMovies = async (req, res) => {
  try {
    const movies = await getAllMoviesQuery();
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Récupérer un film par son ID
const getMovieById = async (req, res) => {
  try {
    const movie = await getMovieByIdQuery(req.params.id);
    res.status(200).json(movie);
  } catch (error) {
    console.error("Error fetching movie:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Récupérer un film par son titre
const getMovieByTitle = async (req, res) => {
  try {
    const movie = await getMovieByTitleQuery(req.params.title);
    res.status(200).json(movie);
  } catch (error) {
    console.error("Error fetching movie:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Récupérer un film par son slug
const getMovieBySlug = async (req, res) => {
  try {
    const movie = await getMovieBySlugQuery(req.params.slug);
    res.status(200).json(movie);
  } catch (error) {
    console.error("Error fetching movie:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Récupérer les films les mieux notés
const getBestMovies = async (req, res) => {
  try {
    const movies = await getBestMoviesQuery();
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Récupérer les films les moins notés
const getWorstMovies = async (req, res) => {
  try {
    const movies = await getWorstMoviesQuery();
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Récupérer les films les plus récents
const getLatestMovies = async (req, res) => {
  try {
    const movies = await getLatestMoviesQuery();
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Récupérer les films de façon aléatoire
const getRandomMovies = async (req, res) => {
  try {
    const movies = await getRandomMoviesQuery();
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  getMovieByTitle,
  getMovieBySlug,
  getBestMovies,
  getWorstMovies,
  getLatestMovies,
  getRandomMovies,
};
