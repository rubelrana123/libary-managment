import express, {Application, Request,Response} from 'express';
import { booksRoutes } from './app/controllers/books.controller';
import { globalErrorHandler } from './app/middlewares/globaErrorHandler';
import { borrowRoutes, getSummaryOfBorrowedBook } from './app/controllers/borrow.controller';
const app : Application = express();
app.use(express.json());
 app.use("/api/books", booksRoutes);
 app.use("/api/borrow", borrowRoutes);
 app.use("/api/borrow", getSummaryOfBorrowedBook);

 
app.get("/", (req : Request, res : Response) => {
    res.send("welcome to the libary managment app")
})
// app.use(globalErrorHandler);
export default app;
