const ROLES = require("../../config/roles");

const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    console.log("req.user", req.user);
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        status: 403,
        message: "Accès refusé. Rôle non autorisé.",
      });
    }
    next();
  };
};

module.exports = { authorize };
