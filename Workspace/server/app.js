import express from "express";
import cors from "cors";
import errorMiddleware  from "./middleware/errorMiddleware.js";

import authRoutes from "./routes/authRoutes.js"
import ideaRoutes from "./routes/ideaRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"
import sportsRoutes from "./routes/sportsRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/ai", aiRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ideas", ideaRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/sports", sportsRoutes);

app.use(errorMiddleware)

export default app;