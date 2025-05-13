import app from "./app";
import sequelize from "./database/database";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

// Synchroniser la base de données
sequelize
  .sync({ alter: process.env.NODE_ENV === "development" })
  .then(() => {
    console.log("Database synchronized successfully");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
