import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

import AnimatedPage from "../components/AnimatedPage";

import AuthInput from "../components/auth/AuthInput";
import PasswordInput from "../components/auth/PasswordInput";
import GradientButton from "../components/auth/GradientButton";
import Divider from "../components/auth/Divider";
import SocialLogin from "../components/auth/SocialLogin";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [acceptTerms, setAcceptTerms] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  // =========================
  // Password Strength
  // =========================

  function getPasswordStrength(password) {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
  }

  const strength = getPasswordStrength(form.password);

  const strengthText = [
    "Very Weak",
    "Weak",
    "Medium",
    "Strong",
    "Excellent",
  ][strength];

  const strengthColor = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-green-500",
  ][strength];

  // =========================
  // Register
  // =========================

  async function handleSubmit(e) {
    e.preventDefault();

    if (!acceptTerms) {
      toast.error(
        "Please accept the Terms & Conditions."
      );
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
     await api.post(
  "/auth/register",
  {
    name: form.name,
    email: form.email,
    password: form.password,
  }
);

      toast.success("Account created successfully!");

      navigate("/login");

    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
        "Registration failed."
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatedPage>

      <form
        onSubmit={handleSubmit}
        className="space-y-10"
      >

        <AuthInput
          label="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <AuthInput
          icon="email"
          label="Email Address"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <PasswordInput
          label="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
                {/* Password Strength */}

        <div>

          <div className="mb-2 h-2 overflow-hidden rounded-full bg-white/20">

            <div
              className={`h-full transition-all duration-500 ${strengthColor}`}
              style={{
                width: `${(strength / 4) * 100}%`,
              }}
            />

          </div>

          <p className="text-sm text-gray-300">

            Password Strength:

            <span className="ml-2 font-semibold text-white">
              {strengthText}
            </span>

          </p>

        </div>

        {/* Confirm Password */}

      <PasswordInput
  label="Confirm Password"
  name="confirmPassword"
  value={form.confirmPassword}
  onChange={handleChange}
  error={form.password !== form.confirmPassword}
  success={form.password === form.confirmPassword}
/>

        {/* Password Match */}

        {form.confirmPassword !== "" && (

          <p
            className={`text-sm font-medium ${
              form.password === form.confirmPassword
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {form.password === form.confirmPassword
              ? "✓ Passwords match"
              : "✗ Passwords do not match"}
          </p>

        )}

        {/* Terms */}

        <label className="flex items-start gap-3 text-sm text-gray-300">

          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={() =>
              setAcceptTerms(!acceptTerms)
            }
            className="mt-1 accent-blue-500"
          />

          <span>

            I agree to the{" "}

            <Link
              to="/terms"
              className="font-semibold text-blue-300 hover:text-white"
            >
              Terms & Conditions
            </Link>

          </span>

        </label>

        {/* Register Button */}

        <GradientButton loading={loading}>
          Create Account
        </GradientButton>

        <Divider />

        <SocialLogin />

        <p className="pt-2 text-center text-gray-300">

          Already have an account?{" "}

          <Link
            to="/login"
            className="font-semibold text-blue-300 transition hover:text-white"
          >
            Sign In
          </Link>

        </p>

      </form>

    </AnimatedPage>

  );
}

export default Register;