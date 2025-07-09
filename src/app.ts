import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { bookRouter } from "./app/routes/books.routes";
import { borrowRouter } from "./app/routes/borrow.routes";
import globalErrorHandler from "./app/middlewares/globaErrorHandler";
const app: Application = express();
app.use(express.json());
app.use(cors({
  origin: '*',
  credentials: true
}))
app.use("/api/books", bookRouter);
app.use("/api/borrow", borrowRouter);

app.get("/api", (req: Request, res: Response) => {
  res.send("welcome to the libary managment app");
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: `${req.originalUrl} Route Not Found`,
  });
});

app.use(globalErrorHandler);
export default app;
