import { Model, DataTypes } from "sequelize";
import sequelize from "../database/database";
import {
  MovieAttributes,
  MovieCreationAttributes,
  MovieInstance,
} from "../types/models";

class Movie
  extends Model<MovieAttributes, MovieCreationAttributes>
  implements MovieAttributes
{
  public directorId!: number;
  public genreId!: number;
  public id!: number;
  public title!: string;
  public slug!: string;
  public description!: string;
  public releaseDate!: Date;
  public duration!: number;
  public director!: string;
  public genre!: string;
  public posterUrl?: string;
  public trailerUrl?: string;
  public rating?: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt?: Date;
}

Movie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    releaseDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    directorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "directors",
        key: "id",
      },
    },
    genreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "genres",
        key: "id",
      },
    },
    posterUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    trailerUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 0,
        max: 10,
      },
    },
  },
  {
    sequelize,
    modelName: "Movie",
    tableName: "movies",
    timestamps: true,
    paranoid: true,
  }
);

export default Movie;
