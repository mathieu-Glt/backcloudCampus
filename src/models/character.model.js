const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Character = sequelize.define("Character", {
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
    unique: false,
    allowNull: false,
    validate: {
      notEmpty: true,
      isSlug: true,
    },
  },
});

// Hook pour générer le slug avant la création
Character.beforeCreate((character) => {
  character.slug = character.name.toLowerCase().replace(/ /g, "-");
});

// Hook pour mettre à jour le slug avant la mise à jour
Character.beforeUpdate((character) => {
  if (character.changed("name")) {
    character.slug = character.name.toLowerCase().replace(/ /g, "-");
  }
});

module.exports = Character;
