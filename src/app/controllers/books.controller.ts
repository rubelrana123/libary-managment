import { NextFunction, Request, Response } from "express";
import { Book } from "../models/books.model";
export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const books = await Book.create(req.body);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: books,
    });
  } catch (error: any) {
    next(error);
  }
};
export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filter = req.query.filter as string;
    const sortBy = (req.query.sortBy as string) || "createdAt";
    const sortOrder = req.query.sort === "desc" ? -1 : 1;
    const limit = parseInt(req.query.limit as string) || 10;
    let query = Book.find();

    if (filter) {
      query = Book.find({ genre: filter });
    }
    const books = await query.sort({ [sortBy]: sortOrder }).limit(limit);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error: any) {
    next(error);
  }
};
export const getBookById = async (req: Request, res: Response) => {
  try {
    const id = req.params.bookId;
    const book = await Book.findById(id);
    res.status(201).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching books",
      error: error.message,
    });
  }
};
export const updateBookById = async (
  req: Request,
  res: Response
): Promise<any> => {
  //  {copies : 10}

  try {
    const id = req.params.bookId;
    const payload = req.body;

    const book = await Book.findByIdAndUpdate(id, payload, { new: true });

    if (book === null) {
      return res.status(404).json({
        success: false,
        message: `Book not found by (${id}) this id.`,
      });
    }
    await book.updateAvailability();
    res.status(201).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching books",
      error: error.message,
    });
  }
};
export const deleteBookById = async (req: Request, res: Response) => {
  try {
    const id = req.params.bookId;
    await Book.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error deteing books",
      error: error.message,
    });
  }
};
