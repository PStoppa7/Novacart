const pool = require("../config/db");

const getDashboardStats = async (req, res) => {
  try {
    const products = await pool.query(
      "SELECT COUNT(*) FROM products"
    );

    const customers = await pool.query(
      "SELECT COUNT(*) FROM users WHERE role='customer'"
    );

    const orders = await pool.query(
      "SELECT COUNT(*) FROM orders"
    );

    const revenue = await pool.query(
      `SELECT COALESCE(SUM(total),0) AS total
       FROM orders
       WHERE status='Delivered'`
    );

    const recentOrders = await pool.query(`
      SELECT
        id,
        full_name,
        total,
        status,
        created_at
      FROM orders
      ORDER BY created_at DESC
      LIMIT 5
    `);

    const lowStock = await pool.query(`
      SELECT
        id,
        name,
        stock
      FROM products
      WHERE stock <= 5
      ORDER BY stock ASC
      LIMIT 5
    `);

    const latestCustomers = await pool.query(`
      SELECT
        id,
        name,
        email
      FROM users
      WHERE role='customer'
      ORDER BY id DESC
      LIMIT 5
    `);

    const salesChart = await pool.query(`
SELECT
  DATE(created_at) AS date,
  SUM(total)::numeric AS revenue
FROM orders
WHERE status='Delivered'
GROUP BY DATE(created_at)
ORDER BY DATE(created_at);
`);


const categoryStats = await pool.query(`
SELECT
  category,
  COUNT(*) AS total
FROM products
GROUP BY category
ORDER BY total DESC;
`);

    res.json({
      totalProducts: Number(products.rows[0].count),
      totalCustomers: Number(customers.rows[0].count),
      totalOrders: Number(orders.rows[0].count),
      revenue: Number(revenue.rows[0].total),
      recentOrders: recentOrders.rows,
      lowStock: lowStock.rows,
      latestCustomers: latestCustomers.rows,


  salesChart: salesChart.rows,
  categoryStats: categoryStats.rows,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to load dashboard",
    });
  }
};

module.exports = {
  getDashboardStats,
};