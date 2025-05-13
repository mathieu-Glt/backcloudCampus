import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import path from "path";
import { errorHandler } from "./middleware/error.middleware";

// Routes
import movieRoutes from "./routes/movie.route";
import userRoutes from "./routes/user.route";
// import characterRoutes from "./routes/character.route";
// import favoriteListRoutes from "./routes/favoriteList.route";

// Configuration
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    createParentPath: true,
    limits: {
      fileSize: Number(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB max
    },
    abortOnLimit: true,
  })
);

// Static files
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);
// app.use("/api/characters", characterRoutes);
// app.use("/api/favorite-lists", favoriteListRoutes);

// Gestion des erreurs
app.use(errorHandler);

export default app;
