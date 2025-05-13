const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { isAuthenticated } = require("../middleware/auth.middleware");

// Route de test
router.get("/test", function (req, res) {
  res.json({ status: 200, results: "welcome to auth routes" });
});

// Routes d'authentification
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", isAuthenticated, authController.logout);
router.post("/refresh-token", authController.refreshToken);
router.get("/verify-token", isAuthenticated, authController.verifyToken);

module.exports = router;
