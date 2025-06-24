// src/app/middleware/globalErrorHandler.ts
import { ErrorRequestHandler } from "express";
import mongoose from "mongoose";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong";
  if (err instanceof mongoose.Error.ValidationError) {
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

export default globalErrorHandler;
