const cors = require("cors");
const xss = require("xss");
const {
  redirectToHttps,
  securityHeaders,
} = require("../src/middleware/security.middleware");
const csrfProtection = require("../src/middleware/csrf.middleware");

function setupSecurity(app) {
  // Middleware de sécurité
  app.use(securityHeaders);

  // Redirection HTTP vers HTTPS en production
  if (process.env.NODE_ENV === "production") {
    app.use(redirectToHttps);
  }

  // Configuration CORS
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

  // Protection XSS
  app.use((req, res, next) => {
    for (const key in req.body) {
      if (Object.hasOwnProperty.call(req.body, key)) {
        req.body[key] = xss(req.body[key]);
      }
    }
    next();
  });

  // Protection CSRF
  app.use(csrfProtection);
}

module.exports = setupSecurity;
