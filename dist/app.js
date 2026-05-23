import express, {} from "express";
import { initDB } from "./db/index.js";
import cors from "cors";
import { authRouter } from "./modules/auth/aurh.route.js";
import globalErrorHandle from "./middleware/globalErrorHandler.js";
import { issuesRoute } from "./modules/Issues/issues.route.js";
const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
}));
initDB();
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running",
    });
});
app.use("/api/auth", authRouter);
app.use("/api/issues", issuesRoute);
app.use(globalErrorHandle);
export default app;
//# sourceMappingURL=app.js.map