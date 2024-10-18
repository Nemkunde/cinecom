import { Router } from "express";
import { getUsers, getUser, create } from "../controllers/users.controller";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/create", create);

export default router;
