const express = require("express");
const router = express.Router();

const requireAuth = require("../middlewares/requireAuth");

const {
  userSignUp,
  userLogin,
  deleteUser,
} = require("../controllers/userController");

// Signup
router.post("/signup", userSignUp);

// Login
router.post("/login", userLogin);

// Delete user (protected route)
router.delete("/:username", requireAuth, deleteUser);

module.exports = router;