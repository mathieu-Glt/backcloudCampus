const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { isAuthenticated, isAdmin } = require("../middleware/auth.middleware");
const { authorize } = require("../../server/middleware/authorize");
const ROLES = require("../../config/roles");

// Routes protégées nécessitant une authentification
router.get("/profile", isAuthenticated, userController.getUserById);

// Routes nécessitant des droits admin
router.get("/", isAdmin, authorize(ROLES.ADMIN), userController.getAllUsers);
router.get("/:id", isAdmin, authorize(ROLES.ADMIN), userController.getUserById);
router.put("/:id", isAdmin, authorize(ROLES.ADMIN), userController.updateUser);
router.delete(
  "/:id",
  isAdmin,
  authorize(ROLES.ADMIN),
  userController.deleteUser
);

// Route pour l'utilisateur courant
router.get(
  "/me",
  isAuthenticated,
  authorize(ROLES.USER),
  userController.getUserById
);
router.put(
  "/me",
  isAuthenticated,
  authorize(ROLES.USER),
  userController.updateUser
);

module.exports = router;
