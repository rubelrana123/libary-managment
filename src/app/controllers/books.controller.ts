 
import express, {Application, Request,Response} from 'express';
import { Book } from '../models/books.model';
 
export const booksRoutes = express.Router();
booksRoutes.post("/", async(req : Request, res : Response) => {
    const books = await Book.create(req.body) 
    res.status(201).json({
        success : true,
        message: "Book created successfully",
         data : books
    })
    
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

// notesRoutes.get("", async(req : Request, res : Response) => {
//       try {
//             const notes = await Note.find().populate('user');
//         res.status(201).json({
//         success : true,
//         message : "get note successfully",
//         notes
//     })
        
//       } catch (error : any) {
//          res.status(400).json({
//         success : false,
//         message : "get err successfully",
//         error
         
//     })
        
//       }
    
// })
// notesRoutes.get("/:noteId", async(req : Request, res : Response) => {
//     const id = req.params.noteId;
//     const notes = await Note.findById(id);
//     // const notes = await Note.findOne(_id = id);
//     res.status(201).json({
//         success : true, 
//         message : "get a note successfully",
//         notes
//     })
    
// });
// notesRoutes.patch("/:noteId", async(req : Request, res : Response) => {
//     const noteId = req.params.noteId;
//     const body = req.body;
//     //approach 1
//       const notes = await Note.findByIdAndUpdate(noteId,body, {new : true})
//       //apporoach 2
//     //   const notes = await Note.updat eOne({_id : noteId},body, {new : true})

//       //apporach 3
// //  const notes = await Note.findOneAndUpdate(
// //   { _id: id }, // Filter to find the document
// //   { $set: { title: 'Learn Typescript', tags : {label : "Basic"} } }, // Update operations
// //   { new: true } // Options: return the modified document
// // );
//     res.status(201).json({
//         success : true, 
//         message : " a note update successfully",
//         notes
//     })
    
// })
// notesRoutes.post("/create-note", async(req : Request, res : Response) => {
//     const body = req.body;
//     //approach 1of post data
//     // const note = new Note({
//     //     title : "Eat the frog book",
//     //     content : "reading a book that named eat the frogs",
//     //     tags : {label :  "database"}
//     // })
//     // await   note.save()

//     //approach 2 data post
//     const note = await Note.create(body) 
//     res.status(201).json({
//         success : true,
//         message : "create note successfully",
//         note
//     })
    
// })
// notesRoutes.delete("/:noteId", async(req : Request, res : Response) => {
//     const noteId = req.params.noteId;
//     // apporaoach 1
//           const notes = await Note.findOneAndDelete({_id : noteId});
//       //apporoach 2
//     //   const notes = await Note.deleteOneOne({_id : noteId},body, {new : true})
//     //approach another
//     //  Note.deleteOne({ _id: noteId})
//     //   .then(result => {
//     //     if (result.deletedCount > 0) {
//     //        res.status(201).json({
//     //     success : true, 
//     //     message : " a note delete successfully",
        
//     // })
//     //     } else {
//     //       console.log('note not found');
//     //     }
//     //   })
//     //   .catch(error => {
//     //     console.error('Error deleting user:', error);
//     //   });

//         res.status(201).json({
//         success : true, 
//         message : " a note delete successfully",
//         notes
//     })
//   })