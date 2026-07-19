const express = require("express");

const router = express.Router();

const upload = require("../config/multer");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  updateStock,
} = require("../controllers/productController");

// ======================
// PUBLIC ROUTES
// ======================

// GET all products
router.get("/", getProducts);

// GET single product
router.get("/:id", getProductById);

// ======================
// ADMIN ONLY ROUTES
// ======================

// ADD product
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  addProduct
);

// UPDATE product
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  updateProduct
);

// UPDATE STOCK
router.put(
  "/:id/stock",
  authMiddleware,
  adminMiddleware,
  updateStock
);

// DELETE product
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteProduct
);

module.exports = router;