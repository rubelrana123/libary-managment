 
import express, { NextFunction, Request, Response } from 'express';
import { Book } from '../models/books.model';
 
export const booksRoutes = express.Router();


booksRoutes.post("/", async (req: Request, res: Response, next : NextFunction) : Promise<any> => {
  try {
    const books = await Book.create(req.body);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: books,
    });
  } catch (error: any) {
      if (error.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      success: false,
      error: {
        name: error.name,
        errors: error.errors,
      },
    });
  }
  }
});


booksRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const filter = req.query.filter as string;
    const sortBy = req.query.sortBy as string || "createdAt";
    const sortOrder = req.query.sort === "desc" ? -1 : 1;
    const limit = parseInt(req.query.limit as string) || 10;

    // Base query
    let query = Book.find();

    // Apply genre filter
    if (filter) {
      query = Book.find({genre : filter})
    }

// Apply sort and limit
    const books = await query.sort({ [sortBy]: sortOrder }).limit(limit);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching books",
      error: error.message,
    });
  }
});
booksRoutes.get("/:bookId", async(req : Request, res : Response) => {
    try {
    const id = req.params.bookId;
    const book = await Book.findById(id);
    // console.log({id})
    res.status(201).json({
        success : true, 
        message : "Book retrieved successfully",
        data : book
    })
    } catch (error : any) {
      
    res.status(500).json({
      success: false,
      message: "Error fetching books",
      error: error.message,
    });
        
    }
    
});
booksRoutes.patch("/:bookId", async(req : Request, res : Response) => {
    try {
    const id = req.params.bookId;
    const payload = req.body;
    const book = await Book.findByIdAndUpdate(id, {$set : payload}, {new : true});
    res.status(201).json({
        success : true, 
        message : "Book updated successfully",
        data : book
    })
    } catch (error : any) {
      
    res.status(500).json({
      success: false,
      message: "Error fetching books",
      error: error.message,
    });
        
    }
    
});
booksRoutes.delete("/:bookId", async(req : Request, res : Response) => {
    try {
    const id = req.params.bookId;
    await Book.findByIdAndDelete(id);
     res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    })
 
    }catch (error : any) {
      
    res.status(500).json({
      success: false,
      message: "Error deteing books",
      error: error.message,
    });
     }   
});