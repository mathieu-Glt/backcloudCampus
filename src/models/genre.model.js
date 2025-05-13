const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

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
    tableName: "Genres", // Nom explicite de la table pour correspondre à la référence dans Movie
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

// Fonction pour définir la relation plus tard
Genre.associate = (models) => {
  Genre.hasMany(models.Movie, {
    foreignKey: "genreId",
    as: "movies",
    onDelete: "RESTRICT", // Empêche la suppression d'un genre s'il a des films
    onUpdate: "CASCADE", // Met à jour les films si le genre est modifié
  });
};

// Méthode pour vérifier si un genre existe
Genre.genreExists = async (name) => {
  const genre = await Genre.findOne({
    where: { name },
  });
  return genre ? true : false;
};

module.exports = Genre;
