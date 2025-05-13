import { DataTypes, Model } from "sequelize";
import sequelize from "../database/database";
import {
  CartItemAttributes,
  CartItemCreationAttributes,
} from "../types/models";

class CartItem extends Model<CartItemAttributes, CartItemCreationAttributes> {
  declare id: number;
  declare cartId: number;
  declare movieId: number;
  declare quantity: number;
  declare price: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date;
}

CartItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "carts",
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
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1,
      },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
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
    modelName: "CartItem",
    tableName: "cart_items",
    paranoid: true,
  }
);

export default CartItem;
