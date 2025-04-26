const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  sessionDestroy,
  registerUser,
  loginUser,
  checkAuth,
} = require("../controllers/auth.controller");
const {
  registerValidation,
  loginValidation,
} = require("../middleware/validators/auth.validator");

router.get("/test", function (req, res) {
  res.json({ status: 200, results: "welcome to auth routes" });
});

// Route d'inscription
router.post("/register", registerValidation, registerUser);

// Route de connexion avec Passport
router.post(
  "/login",
  loginValidation,
  passport.authenticate("local", {
    failureMessage: true,
  }),
  loginUser
);

// Route de déconnexion
router.post("/logout", sessionDestroy);

// Route pour vérifier l'authentification
router.get("/check", checkAuth);

module.exports = router;
