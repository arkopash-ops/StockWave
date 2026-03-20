import dotenv from "dotenv";
dotenv.config();

import http from "http"
import { Server } from "socket.io";

import { connectDB } from "./config/db.js";
import app from "./app.js";
import { seedAdmin } from "./config/seedAdmin.js";
import { startPriceUpdater } from "./services/assets.service.js";

let io: Server;
export { io };

const startServer = async () => {
    try {
        await connectDB();

        seedAdmin();

        const PORT = process.env.PORT || 8080;

        const server = http.createServer(app);      // creating http server from Express app

        // Attach server to Socket.IO
        io = new Server(server, {
            cors: {
                origin: "http://localhost:5173",
                methods: ["GET", "POST"],
                credentials: true,
            }
        });

        io.on("connection", (socket) => {
            console.log(`Client Connected: ${socket.id}`);

            socket.on("disconnect", () => {
                console.log(`Client disconnected: ${socket.id}`);
            });
        });

        startPriceUpdater(3000);

        server.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Server failed to start:", error);
        process.exit(1);
    }
}

startServer();
