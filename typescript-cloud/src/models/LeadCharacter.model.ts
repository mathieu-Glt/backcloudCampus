import { DataTypes, Model } from "sequelize";
import sequelize from "../database/database";
import {
  LeadCharacterAttributes,
  LeadCharacterCreationAttributes,
} from "../types/models";

class LeadCharacter extends Model<
  LeadCharacterAttributes,
  LeadCharacterCreationAttributes
> {
  declare id: number;
  declare name: string;
  declare description: string;
  declare role: string;
  declare movieId: number;
  declare actorName: string;
  declare characterImage?: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt?: Date;
}

LeadCharacter.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "movies",
        key: "id",
      },
    },
    actorName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    characterImage: {
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
    modelName: "LeadCharacter",
    tableName: "lead_characters",
    paranoid: true,
  }
);

export default LeadCharacter;
