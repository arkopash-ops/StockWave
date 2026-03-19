import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.js";
import app from "./app.js";
import { seedAdmin } from "./config/seedAdmin.js";

const startServer = async () => {
    try {
        await connectDB();

        seedAdmin();

        const PORT = process.env.PORT || 8081;

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Server failed to start:", error);
        process.exit(1);
    }
}

startServer();
