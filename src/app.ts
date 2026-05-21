import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { initDB } from "./db/index.js";
import cors from "cors";

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



export default app;
