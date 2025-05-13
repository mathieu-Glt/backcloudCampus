const express = require("express");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

// Import des configurations
const setupLogger = require("./logger");
const setupSecurity = require("./security");
const setupSession = require("./session");
const errorHandler = require("./middleware/errorHandler");

async function createApp() {
  const app = express();

  // Configuration des middlewares de base
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(fileUpload());
  app.use(express.static(path.join(__dirname, "..", "build")));

  // Configuration des logs
  setupLogger(app);

  // Configuration de la sécurité
  setupSecurity(app);

  // Configuration de la session
  await setupSession(app);

  // Routes de l'application
  const authRoutes = require("../src/routes/auth.route");
  const userRoutes = require("../src/routes/user.route");
  const movieRoutes = require("../src/routes/movie.route");

  app.get("/", (req, res) => {
    res.send("Hello World");
  });

  // Routes API
  app.use("/api/auth", authRoutes);
  app.use("/api/movie", movieRoutes);

  // Middleware pour gérer les routes non trouvées (404)
  app.use((req, res, next) => {
    const err = new Error("Route non trouvée");
    err.status = 404;
    next(err);
  });

  // Gestionnaire d'erreurs global (doit être le dernier middleware)
  app.use(errorHandler);

  return app;
}

module.exports = createApp;
