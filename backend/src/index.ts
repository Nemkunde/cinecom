import express from "express";
import routes from "./routes";
import authRoutes from "./routes/auth.route";
// import cors from "cors";

const app = express();
const port = 3000;

// app.use(cors());

app.use(express.json());
app.use("/api", routes);
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`server is runnning on localhost:${port}`);
});
