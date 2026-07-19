const express = require("express");
const router = express.Router();

const pool = require("../config/db");
const authenticateToken = require("../middleware/authMiddleware");

// Protect all cart routes
router.use(authenticateToken);

// =================================
// GET CART
// =================================
router.get("/", async (req, res) => {

  try {

    let cart = await pool.query(
      `
      SELECT *
      FROM cart
      WHERE user_id=$1
      `,
      [req.user.id]
    );

    if (cart.rows.length === 0) {

      cart = await pool.query(
        `
        INSERT INTO cart(user_id)
        VALUES($1)
        RETURNING *
        `,
        [req.user.id]
      );

    }

    const items = await pool.query(
      `
      SELECT

      ci.id,
      ci.quantity,

      p.id AS product_id,
      p.name,
      p.price,
      p.image,
      p.stock

      FROM cart_items ci

      JOIN products p
      ON p.id=ci.product_id

      WHERE ci.cart_id=$1
      `,
      [cart.rows[0].id]
    );

    res.json(items.rows);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Unable to load cart."
    });

  }

});

// =================================
// ADD TO CART
// =================================
router.post("/", async (req, res) => {

  try {

    const {
      product_id,
      quantity
    } = req.body;

    let cart = await pool.query(
      `
      SELECT *
      FROM cart
      WHERE user_id=$1
      `,
      [req.user.id]
    );

    if (cart.rows.length === 0) {

      cart = await pool.query(
        `
        INSERT INTO cart(user_id)
        VALUES($1)
        RETURNING *
        `,
        [req.user.id]
      );

    }

    await pool.query(
      `
      INSERT INTO cart_items
      (
        cart_id,
        product_id,
        quantity
      )

      VALUES($1,$2,$3)

      ON CONFLICT(cart_id,product_id)

      DO UPDATE

      SET quantity =
      cart_items.quantity + EXCLUDED.quantity
      `,
      [
        cart.rows[0].id,
        product_id,
        quantity
      ]
    );

    res.json({
      success: true
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Unable to add item."
    });

  }

});

// =================================
// UPDATE QUANTITY
// =================================
router.put("/:id", async (req, res) => {

  try {

    await pool.query(
      `
      UPDATE cart_items
      SET quantity=$1
      WHERE id=$2
      `,
      [
        req.body.quantity,
        req.params.id
      ]
    );

    res.json({
      success: true
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Unable to update cart."
    });

  }

});

// =================================
// REMOVE ITEM
// =================================
router.delete("/:id", async (req, res) => {

  try {

    await pool.query(
      `
      DELETE FROM cart_items
      WHERE id=$1
      `,
      [req.params.id]
    );

    res.json({
      success: true
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Unable to remove item."
    });

  }

});

// =================================
// CLEAR CART
// =================================
router.delete("/", async (req, res) => {

  try {

    const cart = await pool.query(
      `
      SELECT id
      FROM cart
      WHERE user_id=$1
      `,
      [req.user.id]
    );

    if (cart.rows.length) {

      await pool.query(
        `
        DELETE FROM cart_items
        WHERE cart_id=$1
        `,
        [cart.rows[0].id]
      );

    }

    res.json({
      success: true
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Unable to clear cart."
    });

  }

});

module.exports = router;