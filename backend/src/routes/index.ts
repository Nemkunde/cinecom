import { Router } from "express";
import userRoutes from "./users.route";
import seatRoutes from "./seats.route";
import movieRoutes from "./movies.route";
import screeningsRoutes from "./screenings.route";
import bookingsRoutes from "./bookings.route";
import authRoutes from "./auth.route";
import genreRoutes from "./genres.route";
import ticketRoutes from "./tickets.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/seats", seatRoutes);
router.use("/movies", movieRoutes);
router.use("/screenings", screeningsRoutes);
router.use("/bookings", bookingsRoutes);
router.use("/genres", genreRoutes);
router.use("/tickets", ticketRoutes);

export default router;
