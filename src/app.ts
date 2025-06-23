import express, {Application, Request,Response} from 'express';
import { bookRouter } from './app/routes/books.routes';
import { borrowRouter } from './app/routes/borrow.routes';
const app : Application = express();
app.use(express.json());
 app.use("/api/books", bookRouter);
 app.use("/api/borrow", borrowRouter);
//  app.use("/api/borrow", getSummaryOfBorrowedBook);

 
app.get("/", (req : Request, res : Response) => {
    res.send("welcome to the libary managment app")
})
export default app;
