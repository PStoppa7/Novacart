require("dotenv").config();

console.log("Loading:", __filename);

const express = require("express");
const cors = require("cors");
const path = require("path");
const cartRoutes = require("./routes/cart");

const pool = require("./config/db");

pool.query(`
SELECT current_database()
`)
.then(res => {
  console.log("DATABASE:", res.rows[0].current_database);
});

pool.query(`
SELECT column_name
FROM information_schema.columns
WHERE table_name='reviews'
ORDER BY ordinal_position
`)
.then(res => {
  console.log("REVIEWS COLUMNS:");
  console.table(res.rows);
});

const app = express();

// ==========================
// Routes
// ==========================
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const profileRoutes = require("./routes/profileRoutes");
const accountRoutes = require("./routes/accountRoutes");
const reviewRoutes = require("./routes/reviews");
const addressRoutes = require("./routes/addressRoutes");
const checkoutRoutes = require("./routes/checkout");
const wishlistRoutes = require("./routes/wishlist");
// ==========================
// Middleware
// ==========================
app.use(cors());
app.use(express.json());

// ==========================
// Static Uploads
// ==========================
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// ==========================
// API Routes
// ==========================
app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/payments", paymentRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/profile", profileRoutes);

app.use("/api/account", accountRoutes);

app.use("/uploads", express.static("uploads"));

app.use("/api/reviews", reviewRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/address", addressRoutes);

app.use("/api/checkout", checkoutRoutes);

app.use("/api/wishlist", wishlistRoutes);
// ==========================
// Home Route
// ==========================
app.get("/", (req, res) => {
  res.send("NovaCart API Running 🚀");
});

// ==========================
// Database Test
// ==========================
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      success: true,
      message: "Database connected successfully!",
      time: result.rows[0].now,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// ==========================
// Start Server
// ==========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});