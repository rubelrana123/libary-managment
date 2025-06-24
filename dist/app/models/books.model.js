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
exports.Book = exports.Genre = void 0;
const mongoose_1 = require("mongoose");
const borrow_model_1 = require("./borrow.model");
var Genre;
(function (Genre) {
    Genre["FICTION"] = "FICTION";
    Genre["NON_FICTION"] = "NON_FICTION";
    Genre["SCIENCE"] = "SCIENCE";
    Genre["HISTORY"] = "HISTORY";
    Genre["BIOGRAPHY"] = "BIOGRAPHY";
    Genre["FANTASY"] = "FANTASY";
})(Genre || (exports.Genre = Genre = {}));
const bookSchema = new mongoose_1.Schema({
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
        unique: true,
        trim: true
    },
    description: {
        type: String
    },
    copies: {
        type: Number,
        required: [true, "copies field are required"],
        min: [0, "Not allow negative number"]
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
});
bookSchema.pre('validate', function (next) {
    if (this.genre && typeof this.genre === 'string') {
        this.genre = this.genre.toUpperCase();
    }
    next();
});
bookSchema.method("updateAvailability", function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.available = this.copies > 0;
        yield this.save();
    });
});
bookSchema.post("findOneAndDelete", (doc, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (doc) {
        yield borrow_model_1.Borrow.deleteMany({ book: doc._id });
        next();
    }
}));
exports.Book = (0, mongoose_1.model)('Book', bookSchema);
