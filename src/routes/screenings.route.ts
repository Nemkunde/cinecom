import { Router } from "express";
import { getScreenings } from "../controllers/screenings.controller";

const router = Router();

router.get("/", getScreenings);

export default router;
