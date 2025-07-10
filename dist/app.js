"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const books_routes_1 = require("./app/routes/books.routes");
const borrow_routes_1 = require("./app/routes/borrow.routes");
const globaErrorHandler_1 = __importDefault(require("./app/middlewares/globaErrorHandler"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: '*',
    credentials: true
}));
app.use("/api/books", books_routes_1.bookRouter);
app.use("/api/borrow", borrow_routes_1.borrowRouter);
app.get("/api", (req, res) => {
    res.send("welcome to the libary managment app");
});
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: `${req.originalUrl} Route Not Found`,
    });
});
app.use(globaErrorHandler_1.default);
exports.default = app;
