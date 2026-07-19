const express = require("express");
const router = express.Router();

const pool = require("../config/db");
const authenticateToken = require("../middleware/authMiddleware");

router.post("/", authenticateToken, async (req, res) => {

  const client = await pool.connect();

  try {

    await client.query("BEGIN");

    const user_id = req.user.id;

    const {
      address,
      delivery_method,
      payment_method,
    } = req.body;

    // ==========================
    // Save / Update Address
    // ==========================

    const existingAddress = await client.query(
      `
      SELECT id
      FROM addresses
      WHERE user_id=$1
      `,
      [user_id]
    );

    if (existingAddress.rows.length === 0) {

      await client.query(
        `
        INSERT INTO addresses
        (
          user_id,
          first_name,
          last_name,
          phone,
          address_line1,
          address_line2,
          city,
          province,
          postal_code
        )
        VALUES
        ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        `,
        [
          user_id,
          address.first_name,
          address.last_name,
          address.phone,
          address.address_line1,
          address.address_line2,
          address.city,
          address.province,
          address.postal_code,
        ]
      );

    } else {

      await client.query(
        `
        UPDATE addresses
        SET
          first_name=$1,
          last_name=$2,
          phone=$3,
          address_line1=$4,
          address_line2=$5,
          city=$6,
          province=$7,
          postal_code=$8
        WHERE user_id=$9
        `,
        [
          address.first_name,
          address.last_name,
          address.phone,
          address.address_line1,
          address.address_line2,
          address.city,
          address.province,
          address.postal_code,
          user_id,
        ]
      );

    }
        // ==========================
    // Get Cart
    // ==========================

    const cart = await client.query(
      `
      SELECT id
      FROM cart
      WHERE user_id=$1
      `,
      [user_id]
    );

    if (cart.rows.length === 0) {
      throw new Error("Cart not found.");
    }

    const cart_id = cart.rows[0].id;

    const items = await client.query(
      `
      SELECT
        ci.*,
        p.price,
        p.name
      FROM cart_items ci
      JOIN products p
      ON p.id=ci.product_id
      WHERE ci.cart_id=$1
      `,
      [cart_id]
    );

    if (items.rows.length === 0) {
      throw new Error("Your cart is empty.");
    }

    // ==========================
    // Calculate Totals
    // ==========================

    const subtotal = items.rows.reduce(
      (sum, item) =>
        sum +
        Number(item.price) *
        item.quantity,
      0
    );

    const shipping =
      delivery_method === "express"
        ? 150
        : 80;

    const total =
      subtotal + shipping;

    // ==========================
    // Create Order
    // ==========================

    const order = await client.query(
      `
      INSERT INTO orders
      (
        user_id,
        subtotal,
        shipping,
        total,
        payment_method,
        delivery_method,
        status
      )
      VALUES
      ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *
      `,
      [
        user_id,
        subtotal,
        shipping,
        total,
        payment_method,
        delivery_method,
        "Pending",
      ]
    );

    const order_id = order.rows[0].id;
        // ==========================
    // Save Order Items
    // ==========================

    for (const item of items.rows) {

      await client.query(
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
          order_id,
          item.product_id,
          item.quantity,
          item.price,
        ]
      );

    }

    // ==========================
    // Clear Cart
    // ==========================

    await client.query(
      `
      DELETE FROM cart_items
      WHERE cart_id=$1
      `,
      [cart_id]
    );

    // ==========================
    // Commit Transaction
    // ==========================

    await client.query("COMMIT");

    res.json({
      success: true,
      order_id,
      subtotal,
      shipping,
      total,
      message: "Order placed successfully."
    });

  } catch (err) {

    await client.query("ROLLBACK");

    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message || "Unable to place order."
    });

  } finally {

    client.release();

  }

});

module.exports = router;