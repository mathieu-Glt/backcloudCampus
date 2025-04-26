const passport = require("passport");
const User = require("../src/models/user.model");
const LocalStrategy = require("passport-local").Strategy;
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
const util = require("util");

// Sérialisation : ce qui est stocké dans la session
passport.serializeUser((user, done) => {
  // On stocke un objet avec les informations nécessaires
  done(null, {
    id: user.id,
    email: user.email,
    role: user.role,
    firstname: user.firstname,
    lastname: user.lastname,
  });
});

// Désérialisation : comment récupérer l'utilisateur depuis la session
passport.deserializeUser(async (userData, done) => {
  try {
    // On peut soit :
    // 1. Retourner directement les données de la session
    done(null, userData);

    // Ou 2. Récupérer l'utilisateur complet depuis la DB
    const user = await User.findByPk(userData.id);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// 3. Stratégie d'authentification (ici "local" = email/mot de passe)
passport.use(
  "local",
  new LocalStrategy(
    { usernameField: "email" }, // On utilise l'email comme identifiant
    async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email } });
        console.log("User found: ", user);

        if (user) {
          const match = await User.comparePassword(password, user.password); // Utilisation de la méthode de comparaison du modèle User
          if (match) {
            done(null, user); // Si l'uthentification réussie l'utilisateur trouvé est passé à Passport
          } else {
            done(null, false, { message: "Invalid password" }); // Si le mot de passe est incorrect, on renvoie false et on affiche un message d'erreur
          }
        } else {
          done(null, false, { message: "User not found" }); // Si l'utilisateur n'est pas trouvé, on renvoie false et on affiche un message d'erreur  à
        }
      } catch (error) {
        console.error("Erreur lors de la connexion : ", error);
        done(error);
      }
    }
  )
);

module.exports = passport;
