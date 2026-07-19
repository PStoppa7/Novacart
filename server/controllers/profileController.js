const pool = require("../config/db");

// ======================================
// Get Profile
// ======================================
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `
      SELECT
        users.id,
        users.name,
        users.email,
        profiles.phone,
        profiles.address,
        profiles.city,
        profiles.province,
        profiles.postal_code,
        profiles.avatar
      FROM users
      LEFT JOIN profiles
        ON users.id = profiles.user_id
      WHERE users.id = $1
      `,
      [userId]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to load profile."
    });
  }
};

// ======================================
// Update Profile
// ======================================
const updateProfile = async (req, res) => {
  try {

    const userId = req.user.id;

    const {
      phone,
      address,
      city,
      province,
      postal_code,
    } = req.body;

    const exists = await pool.query(
      `
      SELECT *
      FROM profiles
      WHERE user_id = $1
      `,
      [userId]
    );

    if (exists.rows.length === 0) {

      await pool.query(
        `
        INSERT INTO profiles
        (
          user_id,
          phone,
          address,
          city,
          province,
          postal_code
        )
        VALUES
        ($1,$2,$3,$4,$5,$6)
        `,
        [
          userId,
          phone,
          address,
          city,
          province,
          postal_code,
        ]
      );

    } else {

      await pool.query(
        `
        UPDATE profiles
        SET
          phone = $1,
          address = $2,
          city = $3,
          province = $4,
          postal_code = $5,
          updated_at = NOW()
        WHERE user_id = $6
        `,
        [
          phone,
          address,
          city,
          province,
          postal_code,
          userId,
        ]
      );

    }

    res.json({
      message: "Profile updated successfully."
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Failed to update profile."
    });

  }
};

// ======================================
// Upload Avatar
// ======================================
const uploadAvatar = async (req, res) => {
  try {

    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({
        message: "No image selected."
      });
    }

    const avatar = `/uploads/avatars/${req.file.filename}`;

    // Check if profile exists
    const exists = await pool.query(
      `
      SELECT *
      FROM profiles
      WHERE user_id = $1
      `,
      [userId]
    );

    if (exists.rows.length === 0) {

      await pool.query(
        `
        INSERT INTO profiles
        (
          user_id,
          avatar
        )
        VALUES
        ($1,$2)
        `,
        [
          userId,
          avatar,
        ]
      );

    } else {

      await pool.query(
        `
        UPDATE profiles
        SET
          avatar = $1,
          updated_at = NOW()
        WHERE user_id = $2
        `,
        [
          avatar,
          userId,
        ]
      );

    }

    res.json({
      message: "Avatar uploaded successfully.",
      avatar,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Upload failed."
    });

  }
};

// ======================================
// Exports
// ======================================
module.exports = {
  getProfile,
  updateProfile,
  uploadAvatar,
};