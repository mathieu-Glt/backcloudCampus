import { Model, DataTypes } from "sequelize";
import sequelize from "../database/database";
import {
  CharacterAttributes,
  CharacterCreationAttributes,
  CharacterInstance,
} from "../types/models";

class Character
  extends Model<CharacterAttributes, CharacterCreationAttributes>
  implements CharacterAttributes
{
  public id!: number;
  public name!: string;
  public description!: string;
  public movieId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt?: Date;
}

Character.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "movies",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Character",
    tableName: "characters",
    timestamps: true,
    paranoid: true,
  }
);

export default Character;
