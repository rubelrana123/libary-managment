import { Model, Schema, model } from 'mongoose';
import { BookInstanceMethods, IBook } from '../interfaces/books.interface';
import { Borrow } from './borrow.model';

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
    required: [true, "title field are required"],
    trim: true
  },
  author: {
    type: String,
    required: [true, "author field are required"],
    trim: true
  },
 genre: {
  type: String,
  required: [true, 'Genre is required'],
  enum: {
    values: Object.values(Genre),
    message: '{VALUE} is not a valid genre. Allowed values: FICTION, NON_FICTION, SCIENCE, HISTORY',
  }
 },
  isbn: {
    type: String,
    required: [true, "isbn field are required"],
    unique: true , 
    trim: true
  },
  description: {
    type: String
  },
  copies: {
    type: Number,
    required: [true, "copies field are required"],
    min: [0 , "Not allow negative number"]
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

bookSchema.post("findOneAndDelete", async (doc, next) => {
  if (doc) {
    await Borrow.deleteMany({ book: doc._id });
    next();
  }
})


export const Book = model('Book', bookSchema);
