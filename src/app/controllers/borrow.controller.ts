import { Book } from "../models/books.model";
import { Borrow } from "../models/borrow.model";
import express, { Request, Response } from "express";

export const borrowedBook = async function (req : Request,res: Response) {
 await Borrow.checkBookAvailability(req.body.book);
 const borrow = await Borrow.create(req.body);
res.send({
  success: true,
  message: "Book borrowed successfully",
  data : borrow
})
};

export const getBorrowedBook = async function (req : Request,res: Response) {

  const borrow = await Borrow.find().populate('book')
  res.send({
  success: true,
  message: "Book borrowed successfully",
  data : borrow
})
}
export const getSummaryOfBorrowedBook = async (req: Request, res: Response) => {
    try {
        const summary = await Borrow.aggregate([
    {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
       {
        $lookup: {
          from: "books",  
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
       },
       { $unwind: "$book" },
  {
        $project: {
          book: {
            title: "$book.title",
            isbn: "$book.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);
    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve summary",
      error: error.message,
    });
  }
};