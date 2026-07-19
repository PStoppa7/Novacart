const pool = require("../config/db");

// ======================================
// Create Payment
// ======================================
const createPayment = async (req, res) => {
  try {
    const {
      order_id,
      amount,
      payment_method = "PayFast",
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO payments
      (
        order_id,
        amount,
        payment_method,
        payment_status
      )
      VALUES
      ($1,$2,$3,'Pending')
      RETURNING *
      `,
      [
        order_id,
        amount,
        payment_method,
      ]
    );

    res.status(201).json({
      message: "Payment created successfully.",
      payment: result.rows[0],
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to create payment.",
    });
  }
};

// ======================================
// Payment Statistics
// ======================================
const getPaymentStats = async (req, res) => {
  try {

    const totalPayments = await pool.query(`
      SELECT COUNT(*) AS total
      FROM payments
    `);

    const paidPayments = await pool.query(`
      SELECT COUNT(*) AS total
      FROM payments
      WHERE payment_status='Paid'
    `);

    const pendingPayments = await pool.query(`
      SELECT COUNT(*) AS total
      FROM payments
      WHERE payment_status='Pending'
    `);

    const failedPayments = await pool.query(`
      SELECT COUNT(*) AS total
      FROM payments
      WHERE payment_status='Failed'
    `);

    const revenue = await pool.query(`
      SELECT
      COALESCE(SUM(amount),0) AS total
      FROM payments
      WHERE payment_status='Paid'
    `);

    res.json({
      totalPayments:
        Number(totalPayments.rows[0].total),

      paidPayments:
        Number(paidPayments.rows[0].total),

      pendingPayments:
        Number(pendingPayments.rows[0].total),

      failedPayments:
        Number(failedPayments.rows[0].total),

      revenue:
        Number(revenue.rows[0].total),
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Failed to load payment statistics.",
    });

  }
};

// ======================================
// Get All Payments
// ======================================
const getPayments = async (req, res) => {
  try {

    const result = await pool.query(
      `
      SELECT
        payments.id,
        payments.order_id,
        payments.amount,
        payments.payment_method,
        payments.payment_status,
        payments.transaction_id,
        payments.created_at,

        orders.full_name,
        orders.email,
        orders.phone,
        orders.address,
        orders.city,
        orders.province,
        orders.postal_code

      FROM payments

      JOIN orders
        ON payments.order_id = orders.id

      ORDER BY payments.created_at DESC
      `
    );

    res.json(result.rows);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Failed to fetch payments.",
    });

  }
};

// ======================================
// Get Single Payment
// ======================================
const getPayment = async (req, res) => {
  try {

    const { id } = req.params;

    const paymentResult = await pool.query(
      `
      SELECT
        payments.*,

        orders.full_name,
        orders.email,
        orders.phone,
        orders.address,
        orders.city,
        orders.province,
        orders.postal_code

      FROM payments

      JOIN orders
        ON payments.order_id = orders.id

      WHERE payments.id=$1
      `,
      [id]
    );

    if (paymentResult.rows.length === 0) {
      return res.status(404).json({
        message: "Payment not found.",
      });
    }

    const payment = paymentResult.rows[0];

    const itemsResult = await pool.query(
      `
      SELECT

        oi.quantity,
        oi.price,

        p.name,
        p.image

      FROM order_items oi

      JOIN products p
        ON oi.product_id = p.id

      WHERE oi.order_id=$1
      `,
      [payment.order_id]
    );

    payment.items = itemsResult.rows;

    res.json(payment);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Failed to fetch payment.",
    });

  }
};

// ======================================
// Update Payment
// ======================================
const updatePayment = async (req, res) => {
  try {

    const { id } = req.params;

    const {
      payment_status,
      transaction_id,
    } = req.body;

    const result = await pool.query(
      `
      UPDATE payments

      SET
        payment_status=$1,
        transaction_id=$2

      WHERE id=$3

      RETURNING *
      `,
      [
        payment_status,
        transaction_id,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Payment not found.",
      });
    }

    if (payment_status === "Paid") {

      await pool.query(
        `
        UPDATE orders

        SET status='Paid'

        WHERE id=$1
        `,
        [result.rows[0].order_id]
      );

    }

    res.json({
      message: "Payment updated successfully.",
      payment: result.rows[0],
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Failed to update payment.",
    });

  }
};

// ======================================
// Payment Success
// ======================================
const paymentSuccess = async (req, res) => {

  res.json({
    success: true,
    message: "Payment successful.",
  });

};

// ======================================
// Payment Cancel
// ======================================
const paymentCancel = async (req, res) => {

  res.json({
    success: false,
    message: "Payment cancelled.",
  });

};

// ======================================
// PayFast Notification
// ======================================
const paymentNotify = async (req, res) => {

  console.log("Payment notification received.");

  res.sendStatus(200);

};

module.exports = {
  createPayment,
  getPaymentStats,
  getPayments,
  getPayment,
  updatePayment,
  paymentSuccess,
  paymentCancel,
  paymentNotify,
};