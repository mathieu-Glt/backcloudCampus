import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { AppError } from "./error.middleware";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    next(new AppError(errorMessages.join(", "), 400));
    return;
  }
  next();
};
