import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { initDB } from "./db/index.js";
import cors from "cors";
import { authRouter } from "./modules/auth/aurh.route.js";
import globalErrorHandle from "./middleware/globalErrorHandler.js";
import { issuesRoute } from "./modules/Issues/issues.route.js";

const app: Application = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

initDB();

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/issues", issuesRoute);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `API not found`,
  });
});

app.use(globalErrorHandle);

export default app;
