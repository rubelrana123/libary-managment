import express from "express";
import { createBook, deleteBookById, getAllBooks, getBookById, updateBookById } from "../controllers/books.controller";
 
export const bookRouter = express.Router();

bookRouter.post("/", createBook);
bookRouter.get("/", getAllBooks);
bookRouter.get("/:bookId", getBookById);
bookRouter.patch("/:bookId", updateBookById);
bookRouter.delete("/:bookId", deleteBookById);