import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "./error.middleware";
import { userService } from "../container";

interface JwtPayload {
  id: number;
  role: string;
  iat: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // 1) Vérifier si le token existe
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Please log in to access this resource", 401);
    }

    const token = authHeader.split(" ")[1];

    // 2) Vérifier le token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_jwt_secret_key"
    ) as JwtPayload;

    // 3) Vérifier si l'utilisateur existe toujours
    const user = await userService.getUserById(decoded.id);
    if (!user) {
      throw new AppError(
        "The user belonging to this token no longer exists",
        401
      );
    }

    // 4) Vérifier si l'utilisateur a changé son mot de passe après la création du token
    if (user.passwordChangedAt) {
      const changedTimestamp = user.passwordChangedAt.getTime() / 1000;
      if (decoded.iat < changedTimestamp) {
        throw new AppError(
          "User recently changed password. Please log in again",
          401
        );
      }
    }

    // 5) Ajouter l'utilisateur à la requête
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user || req.user.role !== "admin") {
    next(
      new AppError("You do not have permission to perform this action", 403)
    );
    return;
  }
  next();
};
