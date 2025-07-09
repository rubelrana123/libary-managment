import { Borrow } from "../models/borrow.model";
import { NextFunction, Request, Response } from "express";

export const borrowedBook = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await Borrow.checkBookAvailability(req.body.book);
    const borrow = await Borrow.create(req.body);
    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error: any) {
    next(error);
  }
};
export const getSummaryOfBorrowedBook = async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        //stage 1
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        //stage 2
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      //stage 3
      { $unwind: "$book" },
      {
        //stage 4
        $project: {
          _id: 0,
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
