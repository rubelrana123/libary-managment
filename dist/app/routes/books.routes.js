"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("../controllers/books.controller");
exports.bookRouter = express_1.default.Router();
exports.bookRouter.post("/", books_controller_1.createBook);
exports.bookRouter.get("/", books_controller_1.getAllBooks);
exports.bookRouter.get("/:bookId", books_controller_1.getBookById);
exports.bookRouter.patch("/:bookId", books_controller_1.updateBookById);
exports.bookRouter.delete("/:bookId", books_controller_1.deleteBookById);
