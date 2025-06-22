import express, {Application, Request,Response} from 'express';
import { booksRoutes } from './controllers/books.controller';
const app : Application = express();
app.use(express.json());
 app.use("/api/books", booksRoutes)
app.get("/", (req : Request, res : Response) => {
    res.send("welcome to the libary managment app")
})
export default app;


// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/rubelrana123/demo.git
// git push -u origin main