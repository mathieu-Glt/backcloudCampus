const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const Movie = require("./movie.model");

const Genre = sequelize.define(
  "Genre",
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
        len: [2, 50],
      },
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    paranoid: true, // Soft delete
  }
);

// Hook pour générer le slug avant la création
Genre.beforeCreate((genre) => {
  genre.slug = genre.name.toLowerCase().replace(/ /g, "-");
});

// Hook pour mettre à jour le slug avant la mise à jour
Genre.beforeUpdate((genre) => {
  if (genre.changed("name")) {
    genre.slug = genre.name.toLowerCase().replace(/ /g, "-");
  }
});

// Relations avec Movie
Genre.hasMany(Movie, {
  foreignKey: "genreId",
  as: "movies",
});

module.exports = Genre;
