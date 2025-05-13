import { DataTypes, Model } from "sequelize";
import sequelize from "../database/database";
import { ReviewAttributes, ReviewCreationAttributes } from "../types/models";

class Review extends Model<ReviewAttributes, ReviewCreationAttributes> {
  declare id: number;
  declare userId: number;
  declare movieId: number;
  declare rating: number;
  declare comment: string;
  declare isVerified: boolean;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt?: Date;
}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
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
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
    modelName: "Review",
    tableName: "reviews",
    paranoid: true,
  }
);

export default Review;
