const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

// Configuration des logs
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "..", "logs", "access.log"),
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

function setupLogger(app) {
  if (process.env.NODE_ENV === "development") {
    console.log("Logging to console with colors and file");
    app.use(morgan(formatLogger));
    app.use(morgan(logFormat, { stream: accessLogStream }));
  } else {
    console.log("Logging to file");
    app.use(morgan(logFormat, { stream: accessLogStream }));
  }
}

module.exports = setupLogger;
