const { Sequelize } = require("sequelize");
const mysql = require("mysql2/promise");
const config = require("../../config");

// Configuration de la base de données à partir de config.js
const dbConfig = {
  host: config.db.host || "localhost",
  username: config.db.user || "root",
  password: config.db.password || "",
  database: config.db.database || "tintin_db",
  dialect: "mysql",
  logging: false,
  dialectOptions: {
    charset: "utf8mb4",
  },
};

// Fonction pour créer la base de données si elle n'existe pas
const createDatabase = async () => {
  try {
    // Connexion à MySQL sans spécifier de base de données
    const connection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.username,
      password: dbConfig.password,
    });

    // Création de la base de données si elle n'existe pas
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`
    );
    console.log(`Base de données ${dbConfig.database} créée ou déjà existante`);

    // Fermeture de la connexion
    await connection.end();
  } catch (error) {
    console.error("Erreur lors de la création de la base de données:", error);
  }
};

// Création de l'instance Sequelize
const sequelize = new Sequelize(dbConfig);

// Test de la connexion
const testConnection = async () => {
  try {
    // Créer la base de données si elle n'existe pas
    await createDatabase();

    // Tester la connexion à la base de données
    await sequelize.authenticate();
    console.log("Connection to database established successfully.");
  } catch (error) {
    console.error("Impossible to connect to the database:", error);
  }
};

testConnection();

module.exports = sequelize;
