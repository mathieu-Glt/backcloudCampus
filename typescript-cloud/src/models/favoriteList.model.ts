import { Model, DataTypes } from "sequelize";
import sequelize from "../database/database";
import {
  FavoriteListAttributes,
  FavoriteListCreationAttributes,
  FavoriteListInstance,
} from "../types/models";

class FavoriteList
  extends Model<FavoriteListAttributes, FavoriteListCreationAttributes>
  implements FavoriteListAttributes
{
  public id!: number;
  public userId!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt?: Date;
}

FavoriteList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "users",
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Ma liste de favoris",
      validate: {
        notEmpty: true,
        len: [1, 100],
      },
    },
  },
  {
    sequelize,
    modelName: "FavoriteList",
    tableName: "favorite_lists",
    timestamps: true,
    paranoid: true,
  }
);

export default FavoriteList;
