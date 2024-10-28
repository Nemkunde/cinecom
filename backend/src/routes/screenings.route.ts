import { Router } from "express";
import {
  getScreenings,
  getScreeningsForMovie,
} from "../controllers/screenings.controller";

const router = Router();

router.get("/", getScreenings);
router.get("/:id", getScreeningsForMovie);

export default router;
