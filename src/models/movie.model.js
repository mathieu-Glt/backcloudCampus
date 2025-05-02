const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Movie = sequelize.define(
  "Movie",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    synopsis: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 1000],
      },
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isUrl: true,
      },
    },
    rate: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
        isInt: true,
        min: 0,
        max: 5,
      },
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isSlug: true,
      },
    },
    genreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

// Fonction pour définir la relation plus tard
Movie.associate = (models) => {
  Movie.belongsTo(models.Genre, {
    foreignKey: "genreId",
    as: "genre",
  });

  Movie.belongsToMany(models.FavoriteList, {
    through: "favorite_list_movies",
    foreignKey: "movieId",
    otherKey: "favoriteListId",
    as: "favoriteLists",
    timestamps: true,
  });
};

Movie.beforeCreate((movie, options) => {
  movie.slug = movie.title.toLowerCase().replace(/ /g, "-");
});

Movie.beforeUpdate((movie, options) => {
  movie.slug = movie.title.toLowerCase().replace(/ /g, "-");

  if (movie.rate > 5) {
    movie.rate = 5;
  }

  if (movie.rate < 0) {
    movie.rate = 0;
  }

  movie.updatedAt = new Date();
});

// Recherche movie exists
Movie.movieExists = async (title) => {
  const movie = await Movie.findOne({
    where: { title },
  });
  return movie ? true : false;
};

module.exports = Movie;
