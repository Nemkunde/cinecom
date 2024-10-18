import { Router } from "express";
import {
  getMovies,
  getMovie,
  updateMovieById,
  deleteMovieById,
  createNewMovie,
} from "../controllers/movies.controller";

const router = Router();

router.get("/", getMovies);
router.get("/:id", getMovie);
router.patch("/:id", updateMovieById);
router.delete("/:id", deleteMovieById);
router.post("/", createNewMovie);

export default router;
