const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Character = sequelize.define(
  "Character",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    biography: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 1000],
      },
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    timestamps: true,
    paranoid: true, // Soft delete
    tableName: "Characters",
  }
);

// Hook pour générer le slug avant la création
Character.beforeCreate((character) => {
  character.slug = `${character.firstName}-${character.lastName}`
    .toLowerCase()
    .replace(/ /g, "-");
});

// Hook pour mettre à jour le slug avant la mise à jour
Character.beforeUpdate((character) => {
  if (character.changed("firstName") || character.changed("lastName")) {
    character.slug = `${character.firstName}-${character.lastName}`
      .toLowerCase()
      .replace(/ /g, "-");
  }
});

// Fonction pour définir la relation plus tard
Character.associate = (models) => {
  Character.belongsToMany(models.Movie, {
    through: "MovieCharacters",
    as: "movies",
    foreignKey: "characterId",
    otherKey: "movieId",
  });
};

module.exports = Character;
