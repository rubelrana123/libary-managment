// middlewares/globalErrorHandler.ts
import { Request, Response, NextFunction } from "express";

export function globalErrorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      success: false,
      error: {
        name: error.name,
        errors: error.errors,
      },
    });
  }

  res.status(500).json({
    message: "Something went wrong",
    success: false,
    error: error.message || "Unknown error",
  });
}
