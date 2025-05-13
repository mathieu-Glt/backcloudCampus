/**
 * @fileoverview Service index file
 *  Centralize all services by one import
 * @module services
 */

import UserService from "./UserService";
import MovieService from "./MovieService";
// import GenreService from './GenreService';
// import ReviewService from './ReviewService';
// import DirectorService from './DirectorService';

// Import des repositories nécessaires
import { userRepository } from "../repositories";
import { movieRepository } from "../repositories";
// import { genreRepository } from '../repositories';
// import { reviewRepository } from '../repositories';
// import { directorRepository } from '../repositories';

// Création des instances des services avec leurs dépendances
const userService = new UserService(userRepository);
const movieService = new MovieService(movieRepository);
// const genreService = new GenreService(genreRepository);
// const reviewService = new ReviewService(reviewRepository);
// const directorService = new DirectorService(directorRepository);

// Export des instances
export {
  userService,
  movieService,
  // genreService,
  // reviewService,
  // directorService
};

// Export des classes (si besoin de créer de nouvelles instances)
export {
  UserService,
  MovieService,
  // GenreService,
  // ReviewService,
  // DirectorService
};
