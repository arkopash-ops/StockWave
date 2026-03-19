import express from "express";
import authRoutes from "./routes/auth.router.js";
import assetRoutes from "./routes/assets.router.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/asset", assetRoutes);

// Global error handler
app.use(errorHandler);

export default app;
