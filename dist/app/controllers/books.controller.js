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
exports.deleteBookById = exports.updateBookById = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const books_model_1 = require("../models/books.model");
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield books_model_1.Book.create(req.body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: books,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createBook = createBook;
const getAllBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = req.query.filter;
        const sortBy = req.query.sortBy || "createdAt";
        const sortOrder = req.query.sort === "asc" ? 1 : -1;
        // const limit = parseInt(req.query.limit as string) || 10;
        let query = books_model_1.Book.find();
        if (filter) {
            query = books_model_1.Book.find({ genre: filter });
        }
        const books = yield query.sort({ [sortBy]: sortOrder });
        // .limit(limit);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllBooks = getAllBooks;
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const book = yield books_model_1.Book.findById(id);
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching books",
            error: error.message,
        });
    }
});
exports.getBookById = getBookById;
const updateBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const payload = req.body;
        console.log("book from body", payload, id);
        // const book = await Book.findByIdAndUpdate(id, payload, { new: true });
        const book = yield books_model_1.Book.findByIdAndUpdate(id, payload, {
            new: true, // return the updated document
            overwrite: true // replace the document entirely
        });
        console.log("book from controller", book);
        if (book === null) {
            return res.status(404).json({
                success: false,
                message: `Book not found by (${id}) this id.`,
            });
        }
        yield book.updateAvailability();
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching books",
            error: error.message,
        });
    }
});
exports.updateBookById = updateBookById;
const deleteBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        yield books_model_1.Book.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deteing books",
            error: error.message,
        });
    }
});
exports.deleteBookById = deleteBookById;
