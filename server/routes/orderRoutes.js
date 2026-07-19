const express = require("express");

const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

// Customer
router.post("/", createOrder);
router.get("/user/:userId", getMyOrders);

// Admin
router.get("/", getAllOrders);
router.put("/:id", updateOrderStatus);

module.exports = router;