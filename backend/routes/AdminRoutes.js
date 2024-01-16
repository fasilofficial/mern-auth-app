import express from "express";
import { protectAdmin } from "../middleware/authMiddleware.js";
import {
  authAdmin,
  registerAdmin,
  logoutAdmin,
  getUsersData,
  addUser,
  blockUser,
  editUser,
  deleteUser,
  searchUsers,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/users", protectAdmin, getUsersData);
router.post("/", registerAdmin);
router.post("/auth", authAdmin);
router.post("/logout", logoutAdmin);
router.post("/add-user", protectAdmin, addUser);
router.post("/block-user", protectAdmin, blockUser);
router.post("/search", protectAdmin, searchUsers);
router.put("/edit-user", protectAdmin, editUser);
router.delete("/delete-user", protectAdmin, deleteUser);

export default router;
