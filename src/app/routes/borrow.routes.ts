import express from 'express'
import { borrowedBook, getBorrowedBook } from '../controllers/borrow.controller'
export const borrowRouter = express.Router()
borrowRouter.post("/" , borrowedBook)
borrowRouter.get("/", getBorrowedBook)