const pool = require("../config/db");

// ======================================
// Account Dashboard
// ======================================
const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await pool.query(
      `
      SELECT COUNT(*) total
      FROM orders
      WHERE user_id=$1
      `,
      [userId]
    );

    const wishlist = await pool.query(
      `
      SELECT COUNT(*) total
      FROM wishlist
      WHERE user_id=$1
      `,
      [userId]
    );

    const reviews = await pool.query(
      `
      SELECT COUNT(*) total
      FROM reviews
      WHERE user_id=$1
      `,
      [userId]
    );

    const recentOrders = await pool.query(
      `
      SELECT *
      FROM orders
      WHERE user_id=$1
      ORDER BY created_at DESC
      LIMIT 5
      `,
      [userId]
    );

    res.json({
      totalOrders: Number(orders.rows[0].total),
      wishlistItems: Number(wishlist.rows[0].total),
      reviewsWritten: Number(reviews.rows[0].total),
      recentOrders: recentOrders.rows,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to load dashboard.",
    });
  }
};

module.exports = {
  getDashboard,
};