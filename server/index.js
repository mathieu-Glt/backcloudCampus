const dotenv = require("dotenv");
const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");
const createApp = require("./app");
const sequelize = require("../src/database/database");

// Configuration de l'environnement
const envFile = `.env.${process.env.NODE_ENV || "development"}`;
dotenv.config({ path: envFile });
console.log(`✅ Chargement de l'environnement depuis : ${envFile}`);

async function startServer() {
  try {
    // Création de l'application Express
    const app = await createApp();

    // Synchronisation de la base de données
    await sequelize.sync({ force: false });
    console.log("✅ Base de données synchronisée avec succès");

    // Test de la connexion à la base de données
    await sequelize.authenticate();
    console.log("✅ Connexion à la base de données établie avec succès");

    // Configuration du serveur
    const PORT = process.env.PORT || 5000;
    let server;

    if (process.env.NODE_ENV === "production") {
      // Configuration HTTPS pour la production
      const httpsOptions = {
        key: fs.readFileSync(path.join(__dirname, "..", "ssl", "private.key")),
        cert: fs.readFileSync(
          path.join(__dirname, "..", "ssl", "certificate.crt")
        ),
      };
      server = https.createServer(httpsOptions, app);
    } else {
      server = http.createServer(app);
    }

    // Démarrage du serveur
    server.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur le port ${PORT}`);
      console.log(`🌍 Mode: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    console.error("❌ Erreur lors du démarrage du serveur:", error);
    process.exit(1);
  }
}

// Démarrage du serveur
startServer();
