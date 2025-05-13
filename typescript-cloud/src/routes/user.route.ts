import { Router } from "express";
import { body } from "express-validator";
import { userController } from "../container";
import { isAuthenticated, isAdmin } from "../middleware/auth.middleware";
import { validateRequest } from "../middleware/validation.middleware";

const router = Router();

// Validation middleware
const createUserValidation = [
  body("username")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters"),
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  validateRequest,
];

const updateUserValidation = [
  body("username")
    .optional()
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Please provide a valid email"),
  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  validateRequest,
];

const changePasswordValidation = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("New password must be at least 6 characters long"),
  validateRequest,
];

// Routes publiques
router.post("/register", createUserValidation, userController.createUser);
router.get("/verify/:token", userController.verifyUser);
router.post("/forgot-password", userController.requestPasswordReset);
router.post("/reset-password/:token", userController.resetPassword);

// Routes protégées
router.use(isAuthenticated);
router.get("/me", userController.getUserById);
router.put(
  "/change-password",
  changePasswordValidation,
  userController.changePassword
);

// Routes admin
router.use(isAdmin);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", updateUserValidation, userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
