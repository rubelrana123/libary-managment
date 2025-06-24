import express from 'express'
import { borrowedBook, getSummaryOfBorrowedBook } from '../controllers/borrow.controller'
export const borrowRouter = express.Router()
borrowRouter.post("/" , borrowedBook)
borrowRouter.get("/", getSummaryOfBorrowedBook)