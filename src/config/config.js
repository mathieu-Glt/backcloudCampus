require("dotenv").config();

module.exports = {
  // Configuration de la base de données
  database: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "cloudcampus",
    dialect: "mysql",
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },

  // Configuration de l'authentification
  auth: {
    jwtSecret: process.env.JWT_SECRET || "your-secret-key",
    jwtExpiration: process.env.JWT_EXPIRATION || "24h",
    refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION || "7d",
    saltRounds: 10, // Pour le hachage des mots de passe
  },

  // Configuration du serveur
  server: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || "development",
  },

  // Configuration des rôles
  roles: {
    ADMIN: "admin",
    USER: "user",
  },
};
