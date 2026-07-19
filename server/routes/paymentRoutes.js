const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  createPayment,
  getPaymentStats,
  getPayments,
  getPayment,
  updatePayment,
  paymentSuccess,
  paymentCancel,
  paymentNotify,
} = require("../controllers/paymentController");

// ======================================
// CUSTOMER ROUTES
// ======================================

// Create Payment
router.post(
  "/",
  authMiddleware,
  createPayment
);

// Payment Success (PayFast)
router.get(
  "/success",
  paymentSuccess
);

// Payment Cancelled (PayFast)
router.get(
  "/cancel",
  paymentCancel
);

// PayFast ITN Notification
router.post(
  "/notify",
  paymentNotify
);

// ======================================
// ADMIN ROUTES
// ======================================

// Dashboard Statistics
router.get(
  "/stats",
  authMiddleware,
  adminMiddleware,
  getPaymentStats
);

// Get All Payments
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getPayments
);

// Get Single Payment
router.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  getPayment
);

// Update Payment Status
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updatePayment
);

module.exports = router;