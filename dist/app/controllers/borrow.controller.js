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
exports.getSummaryOfBorrowedBook = exports.borrowedBook = void 0;
const borrow_model_1 = require("../models/borrow.model");
const borrowedBook = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield borrow_model_1.Borrow.checkBookAvailability(req.body.book);
            const borrow = yield borrow_model_1.Borrow.create(req.body);
            res.send({
                success: true,
                message: "Book borrowed successfully",
                data: borrow
            });
        }
        catch (error) {
            next(error);
        }
    });
};
exports.borrowedBook = borrowedBook;
const getSummaryOfBorrowedBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" },
                },
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "book",
                },
            },
            { $unwind: "$book" },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$book.title",
                        isbn: "$book.isbn",
                    },
                    totalQuantity: 1,
                },
            },
        ]);
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: summary,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve summary",
            error: error.message,
        });
    }
});
exports.getSummaryOfBorrowedBook = getSummaryOfBorrowedBook;
