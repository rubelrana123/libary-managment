"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const books_model_1 = require("./books.model");
const borrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
    },
    quantity: {
        type: Number,
        required: [true, "quantity field are required"],
        min: [0, '{value} not allow ,only positve value allow'],
        validate: {
            validator: Number.isInteger,
            message: "Quantity must be an integer value",
        },
    },
    dueDate: {
        type: Date,
        required: [true, "Due date is required"],
    },
}, {
    timestamps: true,
    versionKey: false,
});
borrowSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const borrow = this;
        const book = yield books_model_1.Book.findById(borrow.book);
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
        yield book.save();
        next();
    });
});
// borrow.model.ts
borrowSchema.static("checkBookAvailability", function (bookId) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield books_model_1.Book.findById(bookId);
        if (!book)
            throw new Error("Book not found");
        if (book.copies <= 0 && book.available === true) {
            book.available = false;
            yield book.save();
        }
    });
});
exports.Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);
