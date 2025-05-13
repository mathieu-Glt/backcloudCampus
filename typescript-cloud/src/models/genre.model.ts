import { DataTypes, Model } from "sequelize";
import sequelize from "../database/database";
import { GenreAttributes, GenreCreationAttributes } from "../types/models";

class Genre extends Model<GenreAttributes, GenreCreationAttributes> {
  declare id: number;
  declare name: string;
  declare description: string;
  declare iconUrl?: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt?: Date;
}

Genre.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
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
      validate: {
        notEmpty: true,
      },
    },
    iconUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Genre",
    tableName: "genres",
    paranoid: true,
  }
);

export default Genre;
