import express from "express";

const router = express.Router();

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

router.post("/", registerAdmin);
router.post("/auth", authAdmin);
router.post("/logout", logoutAdmin);
router.post("/add-user", protectAdmin, addUser);
router.post("/block-user", protectAdmin, blockUser);
router.post("/search", protectAdmin, searchUsers);
router.put("/edit-user", protectAdmin, editUser);
router.delete("/delete-user", protectAdmin, deleteUser);
router.get("/users", protectAdmin, getUsersData);
// router
//   .route("/profile")
//   .get(protectAdmin, getUserProfile)
//   .put(protectAdmin, updateUserProfile);

export default router;
