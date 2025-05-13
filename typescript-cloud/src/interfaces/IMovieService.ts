import {
  MovieAttributes,
  MovieCreationAttributes,
  MovieInstance,
} from "../types/models";

export interface IMovieService {
  getAllMovies(): Promise<MovieInstance[]>;
  getMovieById(id: number): Promise<MovieInstance | null>;
  createMovie(data: MovieCreationAttributes): Promise<MovieInstance>;
  updateMovie(
    id: number,
    data: Partial<MovieAttributes>
  ): Promise<[number, MovieInstance[]]>;
  deleteMovie(id: number): Promise<boolean>;
}
