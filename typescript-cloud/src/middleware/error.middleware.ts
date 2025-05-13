import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorHandler: ErrorRequestHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
    return;
  }

  // Log error for debugging
  console.error("ERROR 💥", err);

  // Send generic error
  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};
