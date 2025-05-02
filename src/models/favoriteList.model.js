const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const FavoriteList = sequelize.define(
  "FavoriteList",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true, // Un utilisateur ne peut avoir qu'une seule liste de favoris
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
    timestamps: true,
    paranoid: true,
    tableName: "favorite_lists",
  }
);

// Définition des relations
FavoriteList.associate = (models) => {
  // Relation avec User (One-to-One)
  FavoriteList.belongsTo(models.User, {
    foreignKey: "userId",
    as: "user",
  });

  // Relation avec Movie (Many-to-Many)
  FavoriteList.belongsToMany(models.Movie, {
    through: "favorite_list_movies",
    foreignKey: "favoriteListId",
    otherKey: "movieId",
    as: "movies",
    timestamps: true,
  });
};

module.exports = FavoriteList;
