import { Model, Schema, model } from 'mongoose';
import { BookInstanceMethods, IBook } from '../interfaces/books.interface';

export enum Genre {
  FICTION = "FICTION",
  NON_FICTION = "NON_FICTION",
  SCIENCE = "SCIENCE",
  HISTORY = "HISTORY",
  BIOGRAPHY = "BIOGRAPHY",
  FANTASY = "FANTASY"
}

const bookSchema = new Schema<IBook, Model<IBook>, BookInstanceMethods>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  genre: {
    type: String,
    required: [true, "Must be one of: `FICTION`, `NON_FICTION`, `SCIENCE`, `HISTORY`, `BIOGRAPHY`, `FANTASY`."],
    enum: Object.values(Genre)
  },
  isbn: {
    type: String,
    required: [true,"isdn must be a unique number"],
    unique: true,
    trim: true
  },
  description: {
    type: String
  },
  copies: {
    type: Number,
    required: [true, "Number of copies is required"],
    min: 0,
    validate: {
    validator: Number.isInteger,
    message: "Copies must be an integer value",
  },

  },
  available: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  versionKey : false
});

bookSchema.pre('validate', function (next) {
  if (this.genre && typeof this.genre === 'string') {
    this.genre = this.genre.toUpperCase() as Genre;
  }
  next();
});

bookSchema.method("updateAvailability", async function () {
  this.available = this.copies > 0;
  await this.save();
});


export const Book = model('Book', bookSchema);
