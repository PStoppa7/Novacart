import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import api from "../services/api";
import toast from "react-hot-toast";
import {
  FiMapPin,
  FiTruck,
  FiCreditCard,
} from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";



/* ===========================
   Framer Motion Variants
=========================== */

const pageVariants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const inputVariants = {
  hidden: {
    opacity: 0,
    x: -25,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.35,
    },
  },
};

const summaryVariants = {
  hidden: {
    opacity: 0,
    x: 40,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      delay: 0.45,
    },
  },
};

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [address, setAddress] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    address_line1: "",
    address_line2: "",
    city: "",
    province: "",
    postal_code: "",
  });

  const [delivery, setDelivery] = useState("standard");

  const [payment, setPayment] = useState("payfast");

  useEffect(() => {
    loadAddress();
  }, []);

  async function loadAddress() {
    try {
      const token = localStorage.getItem("token");

     const res = await api.get("/address", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

      if (res.data.length > 0) {
        setAddress(res.data[0]);
      }

    } catch (err) {
      console.error(err);

    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  }

async function placeOrder() {

  try {

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first.");
      return;
    }
const res = await api.post(
  "/checkout",
  {
    address,
    delivery_method: delivery,
    payment_method: payment,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

    toast.success("Order placed successfully!");

    await clearCart();

    navigate("/order-success", {
      state: {
        order: res.data,
      },
    });

  } catch (err) {

    console.error(err);

    toast.error(
      err.response?.data?.message ||
      "Unable to place order."
    );

  }

}
  
  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (sum, item) =>
        sum +
        Number(item.price || 0) *
          item.quantity,
      0
    );
  }, [cartItems]);

  const shipping =
    delivery === "express"
      ? 150
      : 80;

  const total =
    subtotal + shipping;

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl p-20 text-center">
        Loading checkout...
      </div>
    );
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-7xl px-6 py-10"
    >

      <motion.h1
        variants={cardVariants}
        className="mb-10 text-4xl font-bold"
      >
        Checkout
      </motion.h1>

      <div className="grid gap-10 lg:grid-cols-[1fr_420px]">

        {/* LEFT */}
        <motion.div
          variants={pageVariants}
          className="space-y-8"
        >
                  {/* ==========================
            Shipping Address
        =========================== */}

        <motion.div
          variants={cardVariants}
          whileHover={{
            y: -6,
            scale: 1.01,
          }}
          className="rounded-3xl bg-white p-8 shadow-xl"
        >

          <div className="mb-8 flex items-center gap-3">

            <FiMapPin
              className="text-blue-600"
              size={24}
            />

            <h2 className="text-2xl font-bold">
              Shipping Address
            </h2>

          </div>

          <div className="grid gap-5 md:grid-cols-2">

            <motion.input
              variants={inputVariants}
              name="first_name"
              value={address.first_name}
              onChange={handleChange}
              placeholder="First Name"
              className="
                rounded-xl
                border
                border-gray-300
                bg-white
                p-4
                transition-all
                duration-300
                focus:border-blue-600
                focus:ring-4
                focus:ring-blue-100
                focus:outline-none
              "
            />

            <motion.input
              variants={inputVariants}
              name="last_name"
              value={address.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              className="
                rounded-xl
                border
                border-gray-300
                bg-white
                p-4
                transition-all
                duration-300
                focus:border-blue-600
                focus:ring-4
                focus:ring-blue-100
                focus:outline-none
              "
            />

            <motion.input
              variants={inputVariants}
              name="phone"
              value={address.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="
                rounded-xl
                border
                border-gray-300
                bg-white
                p-4
                md:col-span-2
                transition-all
                duration-300
                focus:border-blue-600
                focus:ring-4
                focus:ring-blue-100
                focus:outline-none
              "
            />

            <motion.input
              variants={inputVariants}
              name="address_line1"
              value={address.address_line1}
              onChange={handleChange}
              placeholder="Street Address"
              className="
                rounded-xl
                border
                border-gray-300
                bg-white
                p-4
                md:col-span-2
                transition-all
                duration-300
                focus:border-blue-600
                focus:ring-4
                focus:ring-blue-100
                focus:outline-none
              "
            />

            <motion.input
              variants={inputVariants}
              name="address_line2"
              value={address.address_line2}
              onChange={handleChange}
              placeholder="Apartment / Unit (Optional)"
              className="
                rounded-xl
                border
                border-gray-300
                bg-white
                p-4
                md:col-span-2
                transition-all
                duration-300
                focus:border-blue-600
                focus:ring-4
                focus:ring-blue-100
                focus:outline-none
              "
            />

            <motion.input
              variants={inputVariants}
              name="city"
              value={address.city}
              onChange={handleChange}
              placeholder="City"
              className="
                rounded-xl
                border
                border-gray-300
                bg-white
                p-4
                transition-all
                duration-300
                focus:border-blue-600
                focus:ring-4
                focus:ring-blue-100
                focus:outline-none
              "
            />

            <motion.input
              variants={inputVariants}
              name="province"
              value={address.province}
              onChange={handleChange}
              placeholder="Province"
              className="
                rounded-xl
                border
                border-gray-300
                bg-white
                p-4
                transition-all
                duration-300
                focus:border-blue-600
                focus:ring-4
                focus:ring-blue-100
                focus:outline-none
              "
            />

            <motion.input
              variants={inputVariants}
              name="postal_code"
              value={address.postal_code}
              onChange={handleChange}
              placeholder="Postal Code"
              className="
                rounded-xl
                border
                border-gray-300
                bg-white
                p-4
                md:col-span-2
                transition-all
                duration-300
                focus:border-blue-600
                focus:ring-4
                focus:ring-blue-100
                focus:outline-none
              "
            />

          </div>

        </motion.div>
                {/* ==========================
            Delivery Method
        =========================== */}

        <motion.div
          variants={cardVariants}
          whileHover={{
            y: -6,
            scale: 1.01,
          }}
          className="rounded-3xl bg-white p-8 shadow-xl"
        >

          <div className="mb-8 flex items-center gap-3">

            <FiTruck
              className="text-green-600"
              size={24}
            />

            <h2 className="text-2xl font-bold">
              Delivery Method
            </h2>

          </div>

          <div className="space-y-5">

            <motion.label
              variants={inputVariants}
              whileHover={{ scale: 1.02 }}
              className={`
                flex
                cursor-pointer
                items-center
                justify-between
                rounded-2xl
                border-2
                p-5
                transition-all

                ${
                  delivery === "standard"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200"
                }
              `}
            >

              <div>

                <h3 className="font-bold">
                  Standard Delivery
                </h3>

                <p className="text-sm text-gray-500">
                  3–5 Business Days
                </p>

              </div>

              <div className="font-bold">
                R80
              </div>

              <input
                type="radio"
                value="standard"
                checked={delivery === "standard"}
                onChange={() =>
                  setDelivery("standard")
                }
              />

            </motion.label>

            <motion.label
              variants={inputVariants}
              whileHover={{ scale: 1.02 }}
              className={`
                flex
                cursor-pointer
                items-center
                justify-between
                rounded-2xl
                border-2
                p-5
                transition-all

                ${
                  delivery === "express"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200"
                }
              `}
            >

              <div>

                <h3 className="font-bold">
                  Express Delivery
                </h3>

                <p className="text-sm text-gray-500">
                  Next Business Day
                </p>

              </div>

              <div className="font-bold">
                R150
              </div>

              <input
                type="radio"
                value="express"
                checked={delivery === "express"}
                onChange={() =>
                  setDelivery("express")
                }
              />

            </motion.label>

          </div>

        </motion.div>

        {/* ==========================
            Payment Method
        =========================== */}

        <motion.div
          variants={cardVariants}
          whileHover={{
            y: -6,
            scale: 1.01,
          }}
          className="rounded-3xl bg-white p-8 shadow-xl"
        >

          <div className="mb-8 flex items-center gap-3">

            <FiCreditCard
              className="text-purple-600"
              size={24}
            />

            <h2 className="text-2xl font-bold">
              Payment Method
            </h2>

          </div>

          <div className="space-y-4">

            {[
              "payfast",
              "card",
              "eft",
            ].map((method) => (

              <motion.label
                key={method}
                variants={inputVariants}
                whileHover={{
                  scale: 1.02,
                }}
                className={`
                  flex
                  cursor-pointer
                  items-center
                  justify-between
                  rounded-2xl
                  border-2
                  p-5
                  transition-all

                  ${
                    payment === method
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200"
                  }
                `}
              >

                <span className="font-semibold capitalize">
                  {method}
                </span>

                <input
                  type="radio"
                  value={method}
                  checked={payment === method}
                  onChange={() =>
                    setPayment(method)
                  }
                />

              </motion.label>

            ))}

          </div>

        </motion.div>

      </motion.div>

      {/* ==========================
          Order Summary
      =========================== */}

      <motion.div
        variants={summaryVariants}
      >

        <motion.div
          whileHover={{
            y: -8,
            scale: 1.01,
          }}
          className="sticky top-8 rounded-3xl bg-white p-8 shadow-2xl"
        >

          <h2 className="mb-8 text-2xl font-bold">
            Order Summary
          </h2>

          <div className="space-y-6">

            {cartItems.map((item) => (

              <motion.div
                key={item.id}
                layout
                whileHover={{
                  x: 6,
                }}
                className="flex gap-4"
              >

                <img
                  src={
                    item.image
                      ? item.image.startsWith("http")
                        ? item.image
                        : `http://localhost:5000${item.image}`
                      : "https://placehold.co/80x80?text=No+Image"
                  }
                  alt={item.name}
                  className="h-20 w-20 rounded-xl object-cover"
                />

                <div className="flex-1">

                  <h3 className="font-semibold">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>

                </div>

                <div className="font-bold">

                  R
                  {(
                    Number(item.price || 0) *
                    item.quantity
                  ).toFixed(2)}

                </div>

              </motion.div>

            ))}

          </div>

          <hr className="my-8" />

          <div className="space-y-4">

            <div className="flex justify-between">

              <span>Subtotal</span>

              <span>
                R{subtotal.toFixed(2)}
              </span>

            </div>

            <div className="flex justify-between">

              <span>Shipping</span>

              <span>
                R{shipping.toFixed(2)}
              </span>

            </div>

            <div className="flex justify-between text-2xl font-bold">

              <span>Total</span>

              <span className="text-blue-600">
                R{total.toFixed(2)}
              </span>

            </div>

          </div>

           <motion.button
  whileHover={{
    scale: 1.03,
  }}
  whileTap={{
    scale: 0.97,
  }}
  initial={{
    opacity: 0,
    y: 30,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    delay: 0.8,
    duration: 0.5,
  }}
  onClick={placeOrder}
  className="
    mt-8
    w-full
    rounded-2xl
    bg-gradient-to-r
    from-blue-600
    to-indigo-600
    py-4
    text-lg
    font-bold
    text-white
    shadow-lg
    transition-all
    duration-300
    hover:shadow-2xl
  "
>
  Place Order
</motion.button>

        </motion.div>

      </motion.div>

    </div>

  </motion.div>
);
}