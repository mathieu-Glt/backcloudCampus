/**
 * @fileoverview Repository index file
 *  Centralize all repositories by one import and create instances
 * @module repositories
 */

import UserRepository from "./UserRepository";
import MovieRepository from "./MovieRepository";
// import GenreRepository from "./GenreRepository";
// import ReviewRepository from "./ReviewRepository";
// import DirectorRepository from "./DirectorRepository";

// Création des instances
const userRepository = new UserRepository();
const movieRepository = new MovieRepository();
// const genreRepository = new GenreRepository();
// const reviewRepository = new ReviewRepository();
// const directorRepository = new DirectorRepository();

// Export des instances
export {
  userRepository,
  movieRepository,
  //   genreRepository,
  //   reviewRepository,
  //   directorRepository,
};

// Export des classes (si besoin de créer de nouvelles instances)
export {
  UserRepository,
  MovieRepository,
  //   GenreRepository,
  //   ReviewRepository,
  //   DirectorRepository,
};
