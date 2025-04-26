const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const fileUpload = require("express-fileupload");
const path = require("path");
const request = require("supertest");
const csrf = require("csrf-token");
const xss = require("xss");
const html = xss('<script>alert("xss");</script>');
console.log("html", html);
const envFile = `.env.${process.env.NODE_ENV || "development"}`;
dotenv.config({ path: envFile });
console.log(`✅ Chargement de l'environnement depuis : ${envFile}`);
const fs = require("fs");
const app = express();
const multer = require("multer");
const chalk = require("chalk");
const sequelize = require("./src/database/database");
// Import de Passport et sa configuration
const passport = require("passport");
require("./config/passport.config");
const https = require("https");
const http = require("http");
const {
  redirectToHttps,
  securityHeaders,
} = require("./src/middleware/security.middleware");
const { errorHandler } = require("./src/middleware/error.middleware");
const csrfProtection = require("./src/middleware/csrf.middleware");

// Configuration des logs
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "logs", "access.log"),
  { flags: "a" }
);

// Format personnalisé pour les logs dans la console
function formatLogger(tokens, req, res) {
  const status = tokens.status(req, res);
  const statusColor =
    status >= 500
      ? "red"
      : status >= 400
        ? "yellow"
        : status >= 300
          ? "cyan"
          : "green";

  // Informations supplémentaires
  const method = tokens.method(req);
  const url = tokens.url(req, res);
  const responseTime = tokens["response-time"](req, res);
  const date = new Date().toLocaleString();
  const ip = req.ip || req.connection.remoteAddress;
  const userAgent = req.get("user-agent") || "";

  return [
    chalk.blue(`[${date}]`),
    chalk.magenta(`[${ip}]`),
    chalk.white(`${method}`),
    chalk.cyan(url),
    chalk[statusColor](status),
    chalk.yellow(`${responseTime}ms`),
    chalk.gray(`[${userAgent}]`),
  ].join(" ");
}

// Format pour les logs dans le fichier
const logFormat =
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';

// Configuration de Morgan pour les logs
console.log("Current NODE_ENV:", process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  console.log("Logging to console with colors and file");
  // En développement, on log dans la console avec des couleurs ET dans le fichier
  app.use(morgan(formatLogger));
  app.use(morgan(logFormat, { stream: accessLogStream }));
} else {
  console.log("Logging to file");
  // En production, on log dans un fichier
  app.use(morgan(logFormat, { stream: accessLogStream }));
}

// Middleware pour parser le JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration de la session avec Sequelize
let sessionStore;
const initSessionStore = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to database established successfully.");

    sessionStore = new SequelizeStore({
      db: sequelize,
      tableName: "sessions",
      checkExpirationInterval: 15 * 60 * 1000, // 15 minutes
      expiration: 7 * 24 * 60 * 60 * 1000, // 7 jours
    });

    await sessionStore.sync();
    console.log("Session store synchronized successfully.");

    app.use(
      session({
        secret: process.env.SESSION_SECRET || "monSecretSuperSecret",
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        cookie: {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
          sameSite: "lax",
        },
      })
    );

    // Initialisation de Passport après la session
    app.use(passport.initialize());
    app.use(passport.session());

    // Ajout du middleware CSRF après la configuration de la session
    app.use(csrfProtection);

    // Routes de l'application
    const backofficeUserRoutes = require("./src/backoffice/routes/user.route");
    const backofficeMovieRoutes = require("./src/backoffice/routes/movieBackoffice.route");
    const authRoutes = require("./src/routes/auth.route");
    const movieRoutes = require("./src/routes/movie.route");

    app.get("/", (req, res) => {
      res.send("Hello World");
    });

    app.use("/api/backoffice/users", backofficeUserRoutes);
    app.use("/api/backoffice/movie", backofficeMovieRoutes);
    app.use("/api/auth", authRoutes);
    app.use("/api/movie", movieRoutes);
  } catch (error) {
    console.error("Error initializing session store:", error);
    process.exit(1);
  }
};

// Initialiser le store de sessions
initSessionStore();

const database = require("./src/database/database");
console.log(" infos config database : ", database);
const config = require("./config");
console.log(" infos config : ", config);

// Synchronisation de la base de données
sequelize
  .sync({ force: false }) // force: false pour ne pas supprimer les données existantes
  .then(() => {
    //Test de la connection çà la abse de donnée requete sql
    database
      .query("SELECT 1")
      .then(() => {
        console.log("✅ Base de données synchronisée avec succès");
      })
      .catch((error) => {
        console.error(
          "❌ Erreur lors de la synchronisation de la base de données:",
          error
        );
      });
  })
  .catch((error) => {
    console.error(
      "❌ Erreur lors de la synchronisation de la base de données:",
      error
    );
  });

// Middleware qui intercepte toutes les requêtes entrantes et filtre les données du corps de la requête (req.body) afin de protéger contre les attaques XSS (Cross-Site Scripting)
app.use((req, res, next) => {
  for (const key in req.body) {
    if (Object.hasOwnProperty.call(req.body, key)) {
      req.body[key] = xss(req.body[key]);
    }
  }
  next();
});

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); // Chemin vers le dossier uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Nom unique pour chaque fichier
  },
});

const upload = multer({ storage }); // Instance multer avec la configuration

// Middleware de sécurité
app.use(securityHeaders);

// Redirection HTTP vers HTTPS en production
if (process.env.NODE_ENV === "production") {
  app.use(redirectToHttps);
}

// Middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://votre-domaine.com"]
        : ["http://localhost:3000", "https://localhost:3001"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Serve static files from the React app inside build directory
app.use(express.static(path.join(__dirname, "build")));

// console.log("SECRET SECRET CSRF", process.env.SECRET);
// Route de test pour générer le jeton CSRF
app.get("/csrf-token", (req, res, next) => {
  // pass the csrfToken to the view
  csrf.create(process.env.SECRET_CSRF).then((token) => {
    console.log(`Look at my fancy CSRF token '${token}'`);
    res.status(200).json({
      status: 200,
      msg: "Results found",
      csrfToken: token,
    });
  });
});

const testModule = require("./testModule");
const Movie = require("./src/models/movie.model");
const User = require("./src/models/user.model");
testModule();

if (process.env.NODE_ENV === "development") {
  console.log("🧪 MODE : Développement");
  Movie.sync({ force: false });
  User.sync({ force: false });
} else if (process.env.NODE_ENV === "test") {
  console.log("🧪 MODE : Test");
} else if (process.env.NODE_ENV === "production") {
  console.log("🚀 MODE : Production");
  Movie.sync({ force: false });
  User.sync({ force: false });
} else {
  console.log("⚠️ MODE : Inconnu");
}

// Active le middleware pour les fichiers
app.use(fileUpload());

// Configuration HTTPS
const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, "config/ssl/private.key")),
  cert: fs.readFileSync(path.join(__dirname, "config/ssl/certificate.crt")),
};

// Création des serveurs HTTP et HTTPS
const httpServer = http.createServer(app);
const httpsServer = https.createServer(httpsOptions, app);

// Démarrage des serveurs
const HTTP_PORT = process.env.HTTP_PORT || 3000;
const HTTPS_PORT = process.env.HTTPS_PORT || 3001;

httpServer.listen(HTTP_PORT, () => {
  console.log(`Serveur HTTP démarré sur le port ${HTTP_PORT}`);
});

httpsServer.listen(HTTPS_PORT, () => {
  console.log(`Serveur HTTPS démarré sur le port ${HTTPS_PORT}`);
});

module.exports = app; // On exporte l'app pour les tests
