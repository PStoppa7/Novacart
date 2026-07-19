const express = require("express");
const router = express.Router();

const pool = require("../config/db");
const authenticateToken = require("../middleware/authMiddleware");

// ===============================
// GET Wishlist
// ===============================
router.get("/", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT
        p.*
      FROM wishlist w
      JOIN products p
        ON p.id = w.product_id
      WHERE w.user_id = $1
      ORDER BY w.created_at DESC
      `,
      [req.user.id]
    );

    res.json(result.rows);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Failed to load wishlist.",
    });

  }
});

// ===============================
// ADD TO WISHLIST
// ===============================
router.post("/", authenticateToken, async (req, res) => {

  try {

    const { product_id } = req.body;

    await pool.query(
      `
      INSERT INTO wishlist
      (
        user_id,
        product_id
      )
      VALUES
      (
        $1,
        $2
      )
      ON CONFLICT
      (
        user_id,
        product_id
      )
      DO NOTHING
      `,
      [
        req.user.id,
        product_id,
      ]
    );

    res.json({
      message: "Added to wishlist.",
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Unable to add wishlist item.",
    });

  }

});

// ===============================
// REMOVE FROM WISHLIST
// ===============================
router.delete("/:id", authenticateToken, async (req, res) => {

  try {

    await pool.query(
      `
      DELETE FROM wishlist
      WHERE user_id=$1
      AND product_id=$2
      `,
      [
        req.user.id,
        req.params.id,
      ]
    );

    res.json({
      message: "Removed from wishlist.",
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Unable to remove wishlist item.",
    });

  }

});

module.exports = router;