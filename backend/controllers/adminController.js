import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (admin && (await admin.matchPasswords(password))) {
    generateToken(res, admin._id, true);
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  res.status(200).json({ message: "Auth admin" });
});

const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const adminExist = await Admin.findOne({ email });
  if (adminExist) {
    res.status(400);
    throw new Error("admin already exist");
  }
  const admin = await Admin.create({ name, email, password });
  if (admin) {
    generateToken(res, admin._id, true);
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid admin data");
  }
});

const logoutAdmin = asyncHandler(async (req, res) => {
  res.cookie("adminJwt", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "admin logged out" });
});

const getUsersData = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

const addUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await Admin.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }
  const user = await User.create({ name, email, password });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      message: "Created user succesfully",
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const blockUser = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const user = await User.findById(userId);
  user.blocked = !user.blocked;
  user.save();
});

const editUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.avatar = req.body.avatar || user.avatar;
    user.password = user.password;
    const updatedUser = await user.save();
    res.status(200).json({
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
        password: updatedUser.password,
      },
      message: "User details updated succesfully",
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.body;
    const deletedUser = await User.findOneAndDelete({ _id: userId });
    if (deletedUser) {
      res.status(200).json({ message: "Deleted user successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const searchUsers = asyncHandler(async (req, res) => {
  try {
    const { searchTerm } = req.body;
    const users = await User.find({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { email: { $regex: searchTerm, $options: "i" } },
      ],
    });
    if (users.length) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: "No results found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export {
  authAdmin,
  registerAdmin,
  logoutAdmin,
  getUsersData,
  addUser,
  blockUser,
  editUser,
  deleteUser,
  searchUsers,
};
