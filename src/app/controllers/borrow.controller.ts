import { Book } from "../models/books.model";
import { Borrow } from "../models/borrow.model";
import express, { Request, Response } from "express";


export const borrowRoutes = express.Router()

borrowRoutes.post("/", async function (req : Request,res: Response) {
 await Borrow.checkBookAvailability(req.body.book);
 const borrow = await Borrow.create(req.body);
res.send({
  success: true,
  message: "Book borrowed successfully",
  data : borrow
})
});
borrowRoutes.get("/", async function (req : Request,res: Response) {

    const borrow = await Borrow.find().populate('book')
    res.send({
  success: true,
  message: "Book borrowed successfully",
  data : borrow
})
})