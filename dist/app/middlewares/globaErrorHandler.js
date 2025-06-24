"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong";
    if (err instanceof mongoose_1.default.Error.ValidationError) {
        statusCode = 400;
        message = "Validation failed";
    }
    //duplicate key error  handler
    if (err.code === 11000 && err.name === 'MongoServerError') {
        const duplicatedField = Object.keys(err.keyValue)[0];
        const duplicatedValue = err.keyValue[duplicatedField];
        res.status(409).json({
            message: "Validation failed",
            success: false,
            error: {
                name: "DuplicateKeyError",
                errors: {
                    [duplicatedField]: {
                        message: `The ${duplicatedField} "${duplicatedValue}" already exists.`,
                        name: "DuplicateError",
                        kind: "unique",
                        path: duplicatedField,
                        value: duplicatedValue
                    }
                }
            }
        });
    }
    res.status(statusCode).json({
        success: false,
        message,
        error: err.errors
    });
};
exports.default = globalErrorHandler;
