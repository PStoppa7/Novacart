const express = require("express");
const router = express.Router();

const pool = require("../config/db");
const authenticateToken = require("../middleware/authMiddleware");

// ==========================
// Get User Addresses
// ==========================
router.get("/", authenticateToken, async (req, res) => {
  try {
    const addresses = await pool.query(
      `
      SELECT *
      FROM addresses
      WHERE user_id=$1
      ORDER BY created_at DESC
      `,
      [req.user.id]
    );

    res.json(addresses.rows);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Unable to load addresses."
    });
  }
});

// ==========================
// Save Address
// ==========================
router.post("/", authenticateToken, async (req, res) => {
  try {

    const {
      first_name,
      last_name,
      phone,
      address_line1,
      address_line2,
      city,
      province,
      postal_code
    } = req.body;

    const result = await pool.query(
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

      RETURNING *
      `,
      [
        req.user.id,
        first_name,
        last_name,
        phone,
        address_line1,
        address_line2,
        city,
        province,
        postal_code
      ]
    );

    res.json(result.rows[0]);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Unable to save address."
    });

  }
});

// ==========================
// Update Address
// ==========================
router.put("/:id", authenticateToken, async (req, res) => {

  try {

    const {
      first_name,
      last_name,
      phone,
      address_line1,
      address_line2,
      city,
      province,
      postal_code
    } = req.body;

    const result = await pool.query(
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

      WHERE id=$9
      AND user_id=$10

      RETURNING *
      `,
      [
        first_name,
        last_name,
        phone,
        address_line1,
        address_line2,
        city,
        province,
        postal_code,
        req.params.id,
        req.user.id
      ]
    );

    res.json(result.rows[0]);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Unable to update address."
    });

  }

});

// ==========================
// Delete Address
// ==========================
router.delete("/:id", authenticateToken, async (req, res) => {

  try {

    await pool.query(
      `
      DELETE FROM addresses
      WHERE id=$1
      AND user_id=$2
      `,
      [
        req.params.id,
        req.user.id
      ]
    );

    res.json({
      success: true
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Unable to delete address."
    });

  }

});

module.exports = router;