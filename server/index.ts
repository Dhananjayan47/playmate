import express, { json } from "express";
import helmet from "helmet"
import cookieParser from "cookie-parser";
import dns from "node:dns"
import { config } from "dotenv";
import connectDB from "./src/config/db.js";
import cors from "cors"
import authRouter from "./src/routers/auth.routes.js";
import errorMiddleware from "./src/middlewares/error.middleware.js";

if( process.env.NODE_ENV !== "production"){
    dns.setServers(["1.1.1.1","8.8.8.8"]);
    console.log(" DNS Server changed");
}
config();


const app = express();
app.use(helmet());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    // allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}))
app.use(json({ limit: '10kb' }));
app.use("/auth", authRouter);


app.get('/health', (_req, res) => {
    res.status(200).json({
        status: 'success',
        uptime: process.uptime(),
        timeStamp: new Date().toISOString(),
    });
});

app.use(errorMiddleware);

const startServer = async (): Promise<void> => {
   await connectDB();

    const port = Number(process.env.PORT ?? 3000);
    app.listen(port, () => {
        console.log(`Server listening in ${process.env.NODE_ENV ?? "development"} mode on http://localhost:${port}`);
    });
};

startServer().catch((error: unknown) => {
    console.error("Failed to start server:", error);
    process.exitCode = 1;
});