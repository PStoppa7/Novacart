const express = require("express");
const router = express.Router();

const pool = require("../config/db");
const authenticateToken = require("../middleware/authMiddleware");

router.post("/", authenticateToken, async (req, res) => {
  try {
    const {
      product_id,
      rating,
      title,
      comment,
    } = req.body;

    const user_id = req.user.id;

    const purchase = await pool.query(
      `
      SELECT *
      FROM orders o
      JOIN order_items oi
      ON oi.order_id=o.id
      WHERE
      o.user_id=$1
      AND oi.product_id=$2
      LIMIT 1
      `,
      [user_id, product_id]
    );

    const verified =
      purchase.rows.length > 0;

    const review = await pool.query(
      `
      INSERT INTO reviews
      (
        product_id,
        user_id,
        rating,
        title,
        comment,
        verified_purchase
      )
      VALUES($1,$2,$3,$4,$5,$6)
      RETURNING *
      `,
      [
        product_id,
        user_id,
        rating,
        title,
        comment,
        verified,
      ]
    );

    await pool.query(
      `
      UPDATE products
      SET rating=
      (
        SELECT ROUND(AVG(rating),1)
        FROM reviews
        WHERE product_id=$1
      )
      WHERE id=$1
      `,
      [product_id]
    );

    res.json(review.rows[0]);

  }catch (err) {
  console.error("===== REVIEW ERROR =====");
  console.error(err);

  res.status(500).json({
    success: false,
    message: err.message,
    detail: err.detail,
    code: err.code,
  });
}
});

router.get("/:productId", async (req, res) => {

  try {

    const reviews = await pool.query(
      `
      SELECT
      r.*,
      u.name

      FROM reviews r

      JOIN users u
      ON u.id=r.user_id

      WHERE r.product_id=$1

      ORDER BY r.created_at DESC
      `,
      [req.params.productId]
    );

    res.json(reviews.rows);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message:"Unable to load reviews."
    });

  }

});

module.exports = router;