import { Router } from "express";
import MovieController from "../controllers/MovieController";
import { movieRepository } from "../repositories";
import MovieService from "../services/MovieService";

const router = Router();
const movieService = new MovieService(movieRepository);
const movieController = new MovieController(movieService);

router.get("/", movieController.getAllMovies);
router.get("/:id", movieController.getMovieById);
router.post("/", movieController.createMovie);
router.put("/:id", movieController.updateMovie);
router.delete("/:id", movieController.deleteMovie);

export default router;
