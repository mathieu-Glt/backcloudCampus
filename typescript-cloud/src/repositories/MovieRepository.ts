import { Movie } from "../models";
import { IMovieRepository } from "../interfaces/IMovieRepository";
import {
  MovieAttributes,
  MovieCreationAttributes,
  MovieInstance,
} from "../types/models";

/**
 * @fileoverview MovieRepository
 * @module repositories/MovieRepository
 * @description MovieRepository
 * @author [@your-name] (https://github.com/your-username)
 */

class MovieRepository implements IMovieRepository {
  async findAll(options?: any): Promise<MovieInstance[]> {
    return await Movie.findAll(options);
  }

  async findByPk(id: number, options?: any): Promise<MovieInstance | null> {
    return await Movie.findByPk(id, options);
  }

  async findOne(options: any): Promise<MovieInstance | null> {
    return await Movie.findOne(options);
  }

  async create(data: MovieCreationAttributes): Promise<MovieInstance> {
    return await Movie.create(data);
  }

  async update(
    id: number,
    data: Partial<MovieAttributes>
  ): Promise<[number, MovieInstance[]]> {
    return await Movie.update(data, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<boolean> {
    const result = await Movie.destroy({ where: { id } });
    return result > 0;
  }
}

export default MovieRepository;
