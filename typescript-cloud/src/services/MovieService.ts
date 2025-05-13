import { IMovieService } from "../interfaces/IMovieService";
import { IMovieRepository } from "../interfaces/IMovieRepository";
import {
  MovieAttributes,
  MovieCreationAttributes,
  MovieInstance,
} from "../types/models";
import { AppError } from "../middleware/error.middleware";

/**
 * @fileoverview MovieService
 * @module services/MovieService
 * @description MovieService
 * @author [@your-name] (https://github.com/your-username)
 * @version 1.0.0
 */

class MovieService implements IMovieService {
  constructor(private movieRepository: IMovieRepository) {}

  async getAllMovies(): Promise<MovieInstance[]> {
    return await this.movieRepository.findAll();
  }

  async getMovieById(id: number): Promise<MovieInstance | null> {
    return await this.movieRepository.findByPk(id);
  }

  async createMovie(data: MovieCreationAttributes): Promise<MovieInstance> {
    return await this.movieRepository.create(data);
  }

  async updateMovie(
    id: number,
    data: Partial<MovieAttributes>
  ): Promise<[number, MovieInstance[]]> {
    return await this.movieRepository.update(id, data);
  }

  async deleteMovie(id: number): Promise<boolean> {
    return await this.movieRepository.delete(id);
  }
}

export default MovieService;
