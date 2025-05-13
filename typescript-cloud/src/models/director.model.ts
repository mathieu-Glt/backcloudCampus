import { DataTypes, Model } from "sequelize";
import sequelize from "../database/database";
import {
  DirectorAttributes,
  DirectorCreationAttributes,
} from "../types/models";

class Director extends Model<DirectorAttributes, DirectorCreationAttributes> {
  declare id: number;
  declare firstName: string;
  declare lastName: string;
  declare biography: string;
  declare birthDate: Date;
  declare nationality: string;
  declare photoUrl?: string;
  declare awards?: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt?: Date;
}

Director.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    biography: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    photoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    awards: {
      type: DataTypes.TEXT,
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
    modelName: "Director",
    tableName: "directors",
    paranoid: true,
  }
);

export default Director;
