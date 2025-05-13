import { Request, Response, NextFunction } from "express";
import MovieService from "../services/MovieService";

class MovieController {
  constructor(private movieService: MovieService) {}

  getAllMovies = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const movies = await this.movieService.getAllMovies();
      res.json(movies);
    } catch (error) {
      next(error);
    }
  };

  getMovieById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const movie = await this.movieService.getMovieById(Number(req.params.id));
      if (!movie) {
        res.status(404).json({ message: "Film non trouvé" });
        return;
      }
      res.json(movie);
    } catch (error) {
      next(error);
    }
  };

  createMovie = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const movie = await this.movieService.createMovie(req.body);
      res.status(201).json(movie);
    } catch (error) {
      next(error);
    }
  };

  updateMovie = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const movie = await this.movieService.updateMovie(
        Number(req.params.id),
        req.body
      );
      res.json(movie);
    } catch (error) {
      next(error);
    }
  };

  deleteMovie = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.movieService.deleteMovie(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}

export default MovieController;
