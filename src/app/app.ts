import express, {Application, Request,Response} from 'express';
import { booksRoutes } from './controllers/books.controller';
import { globalErrorHandler } from './middlewares/globaErrorHandler';
import { borrowRoutes } from './controllers/borrow.controller';
const app : Application = express();
app.use(express.json());
 app.use("/api/books", booksRoutes);
 app.use("/api/borrow", borrowRoutes)
app.get("/", (req : Request, res : Response) => {
    res.send("welcome to the libary managment app")
})
// app.use(globalErrorHandler);
export default app;
