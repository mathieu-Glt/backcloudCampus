import { DataTypes, Model } from "sequelize";
import sequelize from "../database/database";
import { CartAttributes, CartCreationAttributes } from "../types/models";

class Cart extends Model<CartAttributes, CartCreationAttributes> {
  declare id: number;
  declare userId: number;
  declare status: "active" | "completed" | "abandoned";
  declare totalAmount: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date;
}

Cart.init(
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
    status: {
      type: DataTypes.ENUM("active", "completed", "abandoned"),
      allowNull: false,
      defaultValue: "active",
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
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
    modelName: "Cart",
    tableName: "carts",
    paranoid: true,
  }
);

export default Cart;
