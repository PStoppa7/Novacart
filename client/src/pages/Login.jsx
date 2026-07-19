import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";

import AnimatedPage from "../components/AnimatedPage";

import AuthInput from "../components/auth/AuthInput";
import PasswordInput from "../components/auth/PasswordInput";
import GradientButton from "../components/auth/GradientButton";
import RememberMe from "../components/auth/RememberMe";
import Divider from "../components/auth/Divider";
import SocialLogin from "../components/auth/SocialLogin";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [remember, setRemember] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {
  const res = await api.post("/auth/login", {
  email: form.email,
  password: form.password,
});

      login(res.data.user, res.data.token);

      if (remember) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }

      toast.success("Welcome back!");

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
        "Invalid email or password"
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatedPage>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

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

        <div className="flex items-center justify-between">

          <RememberMe
            checked={remember}
            onChange={() =>
              setRemember(!remember)
            }
          />

          <Link
            to="/forgot-password"
            className="
              text-sm
              text-blue-300
              transition
              hover:text-white
            "
          >
            Forgot Password?
          </Link>

        </div>

        <GradientButton loading={loading}>
          Sign In
        </GradientButton>

        <Divider />

        <SocialLogin />
                <p className="pt-2 text-center text-gray-300">
          Don't have an account?{" "}

          <Link
            to="/register"
            className="
              font-semibold
              text-blue-300
              transition
              hover:text-white
            "
          >
            Create Account
          </Link>

        </p>

      </form>

    </AnimatedPage>
  );
}

export default Login;