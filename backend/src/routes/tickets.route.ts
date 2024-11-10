import { Router } from "express";
import { getTicketTypes } from "../controllers/tickets.controller";

const router = Router();

router.get("/ticket-types", getTicketTypes);

export default router;
