import { Schema, model } from 'mongoose';

export enum Genre {
  FICTION = "FICTION",
  NON_FICTION = "NON_FICTION",
  SCIENCE = "SCIENCE",
  HISTORY = "HISTORY",
  BIOGRAPHY = "BIOGRAPHY",
  FANTASY = "FANTASY"
}

const bookSchema = new Schema({
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
    required: true,
    // uppercase : true,
    enum: Object.values(Genre)
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String
  },
  copies: {
    type: Number,
    required: true,
    min: 0
  },
  available: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  versionKey : false
});

// bookSchema.pre('validate', function (next) {
//   if (this.genre && typeof this.genre === 'string') {
//     this.genre = this.genre.toUpperCase() as Genre;
//   }
//   next();
// });

export const Book = model('Book', bookSchema);
