const pool = require("../config/db");

// GET all products
const getProducts = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products ORDER BY id DESC"
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch products",
    });
  }
};

// GET single product
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch product",
    });
  }
};

// ADD a product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      stock,
      description,
    } = req.body;

    // Save uploaded image path
    const image = req.file
      ? `/uploads/${req.file.filename}`
      : null;

    const result = await pool.query(
      `INSERT INTO products
      (name, category, price, stock, image, description)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [
        name,
        category,
        price,
        stock,
        image,
        description,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to add product",
    });
  }
};

// UPDATE a product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Get existing product
    const existing = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [id]
    );

    if (existing.rows.length === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const {
      name,
      category,
      price,
      stock,
      description,
    } = req.body;

    // Keep existing image unless a new one is uploaded
    const image = req.file
      ? `/uploads/${req.file.filename}`
      : existing.rows[0].image;

    const result = await pool.query(
      `UPDATE products
       SET
         name = $1,
         category = $2,
         price = $3,
         stock = $4,
         image = $5,
         description = $6
       WHERE id = $7
       RETURNING *`,
      [
        name,
        category,
        price,
        stock,
        image,
        description,
        id,
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to update product",
    });
  }
};

// DELETE a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM products WHERE id = $1",
      [id]
    );

    res.json({
      message: "Product deleted successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to delete product",
    });
  }
};

// ===============================
// Update Product Stock
// ===============================
const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    const result = await pool.query(
      `
      UPDATE products
      SET stock = GREATEST(stock + $1, 0)
      WHERE id = $2
      RETURNING *
      `,
      [amount, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to update stock",
    });
  }
};



module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  updateStock,
};