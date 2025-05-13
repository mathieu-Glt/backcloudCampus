import {
  MovieAttributes,
  MovieCreationAttributes,
  MovieInstance,
} from "../types/models";

export interface IMovieRepository {
  findAll(options?: any): Promise<MovieInstance[]>;
  findByPk(id: number, options?: any): Promise<MovieInstance | null>;
  findOne(options: any): Promise<MovieInstance | null>;
  create(data: MovieCreationAttributes): Promise<MovieInstance>;
  update(
    id: number,
    data: Partial<MovieAttributes>
  ): Promise<[number, MovieInstance[]]>;
  delete(id: number): Promise<boolean>;
}
