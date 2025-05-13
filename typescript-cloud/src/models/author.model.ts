import { DataTypes, Model } from "sequelize";
import sequelize from "../database/database";
import { AuthorAttributes, AuthorCreationAttributes } from "../types/models";

class Author extends Model<AuthorAttributes, AuthorCreationAttributes> {
  declare id: number;
  declare firstName: string;
  declare lastName: string;
  declare biography?: string;
  declare birthDate?: Date;
  declare deathDate?: Date;
  declare nationality?: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt?: Date;
}

Author.init(
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
      allowNull: true,
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deathDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    nationality: {
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
    modelName: "Author",
    tableName: "authors",
    paranoid: true,
  }
);

export default Author;
