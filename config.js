// configuration du module de session
require("dotenv").config();

module.exports = {
  session: {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  },
  // configuration module base de données
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  port: process.env.PORT || 3000,
  // configuration module de fichier
  file: {
    uploadDir: process.env.UPLOAD_DIR || "uploads",
  },
  // configuration module de mail
  mail: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
  },
};
