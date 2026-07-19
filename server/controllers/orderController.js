const pool = require("../config/db");

// ===============================
// Create Order
// ===============================
const createOrder = async (req, res) => {
  try {
    const {
      user_id,
      total,
      full_name,
      email,
      phone,
      address,
      city,
      province,
      postal_code,
      payment_method,
      items,
    } = req.body;

    // ===============================
    // Check Stock Before Creating Order
    // ===============================
    for (const item of items) {
      const productResult = await pool.query(
        `
        SELECT id, name, stock
        FROM products
        WHERE id = $1
        `,
        [item.product_id]
      );

      if (productResult.rows.length === 0) {
        return res.status(404).json({
          message: "Product not found.",
        });
      }

      const product = productResult.rows[0];

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `${product.name} only has ${product.stock} item(s) left in stock.`,
        });
      }
    }

    // ===============================
    // Create Order
    // ===============================
    const orderResult = await pool.query(
      `
      INSERT INTO orders
      (
        user_id,
        total,
        full_name,
        email,
        phone,
        address,
        city,
        province,
        postal_code,
        payment_method
      )
      VALUES
      ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *
      `,
      [
        user_id,
        total,
        full_name,
        email,
        phone,
        address,
        city,
        province,
        postal_code,
        payment_method,
      ]
    );

    const order = orderResult.rows[0];

    // ===============================
    // Save Order Items & Reduce Stock
    // ===============================
    for (const item of items) {
      // Save Order Item
      await pool.query(
        `
        INSERT INTO order_items
        (
          order_id,
          product_id,
          quantity,
          price
        )
        VALUES
        ($1,$2,$3,$4)
        `,
        [
          order.id,
          item.product_id,
          item.quantity,
          item.price,
        ]
      );

      // Reduce Stock
      await pool.query(
        `
        UPDATE products
        SET stock = stock - $1
        WHERE id = $2
        `,
        [
          item.quantity,
          item.product_id,
        ]
      );
    }

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to create order",
    });
  }
};

// ===============================
// Customer Orders
// ===============================
const getMyOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const ordersResult = await pool.query(
      `
      SELECT *
      FROM orders
      WHERE user_id = $1
      ORDER BY created_at DESC
      `,
      [userId]
    );

    const orders = ordersResult.rows;

    for (const order of orders) {
      const itemsResult = await pool.query(
        `
        SELECT
          oi.id,
          oi.quantity,
          oi.price,
          p.id AS product_id,
          p.name,
          p.image
        FROM order_items oi
        JOIN products p
          ON oi.product_id = p.id
        WHERE oi.order_id = $1
        `,
        [order.id]
      );

      order.items = itemsResult.rows;
    }

    res.json(orders);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
};

// ===============================
// Admin Orders
// ===============================
const getAllOrders = async (req, res) => {
  try {
    const ordersResult = await pool.query(
      `
      SELECT *
      FROM orders
      ORDER BY created_at DESC
      `
    );

    const orders = ordersResult.rows;

    for (const order of orders) {
      const itemsResult = await pool.query(
        `
        SELECT
          oi.id,
          oi.quantity,
          oi.price,
          p.id AS product_id,
          p.name,
          p.image
        FROM order_items oi
        JOIN products p
          ON oi.product_id = p.id
        WHERE oi.order_id = $1
        `,
        [order.id]
      );

      order.items = itemsResult.rows;
    }

    res.json(orders);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
};

// ===============================
// Update Order Status
// ===============================
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await pool.query(
      `
      UPDATE orders
      SET status = $1
      WHERE id = $2
      RETURNING *
      `,
      [status, id]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to update order",
    });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
};