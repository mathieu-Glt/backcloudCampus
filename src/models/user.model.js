const { Model, DataTypes, Op } = require("sequelize");
const sequelize = require("../database/database");
const bcrypt = require("bcrypt");

class User extends Model {
  // Méthode pour vérifier le mot de passe
  async comparePassword(password) {
    return bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [3, 30], // Longueur minimale de 3 caractères, maximale de 30
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [6, 100], // Mot de passe d'au moins 6 caractères
      },
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 50],
      },
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 50],
      },
    },
    role: {
      type: DataTypes.ENUM("USER", "ADMIN"),
      defaultValue: "USER",
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["email"],
      },
      {
        unique: true,
        fields: ["username"],
      },
    ],
  }
);

User.sync({ force: false });

User.beforeCreate((user, options) => {
  user.slug = user.username.toLowerCase().replace(/ /g, "-");
});

User.beforeUpdate((user, options) => {
  user.slug = user.username.toLowerCase().replace(/ /g, "-");

  user.updatedAt = new Date();
});

//

// Méthodes CRUD
// User.createUser = async function (userData) {
//   try {
//     return await this.create(userData);
//   } catch (error) {
//     throw error;
//   }
// };

// User.getAllUsers = async function () {
//   try {
//     return await this.findAll({
//       attributes: { exclude: ["password"] }, // Exclure le mot de passe des résultats
//     });
//   } catch (error) {
//     throw error;
//   }
// };

// User.getUserById = async function (id) {
//   try {
//     return await this.findByPk(id, {
//       attributes: { exclude: ["password"] }, // Exclure le mot de passe des résultats
//     });
//   } catch (error) {
//     throw error;
//   }
// };

// User.getUserByEmail = async function (email) {
//   try {
//     return await this.findOne({
//       where: { email },
//       attributes: { exclude: ["password"] }, // Exclure le mot de passe des résultats
//     });
//   } catch (error) {
//     throw error;
//   }
// };

User.getUserByUsername = async function (username) {
  try {
    return await this.findOne({
      where: { username },
      attributes: { exclude: ["password"] }, // Exclure le mot de passe des résultats
    });
  } catch (error) {
    throw error;
  }
};

// User.updateUser = async function (id, updateData) {
//   try {
//     const user = await this.findByPk(id);
//     if (user) {
//       // Si le mot de passe est inclus dans les données de mise à jour, il doit être hashé
//       // Cette logique devrait être gérée dans le contrôleur ou un service
//       return await user.update(updateData);
//     }
//     return null;
//   } catch (error) {
//     throw error;
//   }
// };

// User.deleteUser = async function (id) {
//   try {
//     const user = await this.findByPk(id);
//     if (user) {
//       await user.destroy();
//       return true;
//     }
//     return false;
//   } catch (error) {
//     throw error;
//   }
// };

// Méthode pour vérifier si un utilisateur existe
User.userExists = async function (email, username) {
  try {
    const existingUser = await this.findOne({
      where: {
        [Op.or]: [{ email: email }, { username: username }],
      },
    });
    return !!existingUser;
  } catch (error) {
    console.error("Error in userExists:", error);
    throw error;
  }
};

// Recheche rôle user
User.userRole = async function (email) {
  const user = await this.findOne({
    where: { email },
  });
  return user.role;
};

// Définition des relations
User.associate = (models) => {
  // Relation avec FavoriteList (One-to-One)
  User.hasOne(models.FavoriteList, {
    foreignKey: "userId",
    as: "favoriteList",
  });
};

module.exports = User;
