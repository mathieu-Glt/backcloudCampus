const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const passport = require("passport");
const sequelize = require("../src/database/database");

async function setupSession(app) {
  try {
    await sequelize.authenticate();
    console.log("Connection to database established successfully.");

    const sessionStore = new SequelizeStore({
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

    return sessionStore;
  } catch (error) {
    console.error("Error initializing session store:", error);
    throw error;
  }
}

module.exports = setupSession;
