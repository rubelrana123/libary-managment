import { Schema, Types, model } from "mongoose";
import { BorrowStaticMethods, IBorrow } from "../interfaces/borrow.interface";
import { Book } from "./books.model";

const borrowSchema = new Schema<IBorrow, BorrowStaticMethods>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    quantity: {
      type: Number,
      required: [true, "quantity field are required"],
      min: [0, "{value} not allow ,only positve value allow"],
      validate: {
        validator: Number.isInteger,
        message: "Quantity must be an integer value",
      },
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

borrowSchema.pre("save", async function (next) {
  const borrow = this;
  const book = await Book.findById(borrow.book);

  if (!book) {
    return next(new Error("Book not found"));
  }

  if (!book.available) {
    return next(new Error("Book is currently not available "));
  }

  if (book.copies < borrow.quantity) {
    return next(new Error(`Only ${book.copies} copies are available`));
  }
  book.copies -= borrow.quantity;
  await book.save();

  next();
});

// borrow.model.ts
borrowSchema.static(
  "checkBookAvailability",
  async function (bookId: Types.ObjectId) {
    const book = await Book.findById(bookId);
    if (!book) throw new Error("Book not found");

    if (book.copies <= 0 && book.available === true) {
      book.available = false;
      await book.save();
    }
  }
);

export const Borrow = model<IBorrow, BorrowStaticMethods>(
  "Borrow",
  borrowSchema
);
