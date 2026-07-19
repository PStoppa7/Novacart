const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../config/avatarUpload");

const {
  getProfile,
  updateProfile,
  uploadAvatar,
} = require("../controllers/profileController");

// ======================================
// Customer Profile
// ======================================

// Get Logged-in User Profile
router.get(
  "/",
  authMiddleware,
  getProfile
);

// Update Profile Details
router.put(
  "/",
  authMiddleware,
  updateProfile
);

// Upload Avatar
router.put(
  "/avatar",
  authMiddleware,
  upload.single("avatar"),
  uploadAvatar
);

module.exports = router;