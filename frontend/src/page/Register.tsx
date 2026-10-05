import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

import api from "../api/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.fullName || !form.email || !form.phone || !form.password) {
      setError("Please fill all the fields");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const { data } = await api.post("/auth/register", form);
      alert("Login successfully");
      localStorage.setItem("token", data.token);

      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 py-4">
      {/* Back */}
      <button onClick={() => navigate(-1)} className="text-gray-800">
        <FiArrowLeft size={22} />
      </button>

      {/* Heading */}
      <div className="mt-4">
        <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
        <p className="mt-1 text-xs text-gray-500">
          Join HealthHand and take control of your health.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleRegister} className="mt-6 space-y-4">
        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-3.5">
          <FiUser size={18} className="text-gray-500" />
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
          />
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-3.5">
          <FiMail size={18} className="text-gray-500" />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
          />
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-3.5">
          <FiPhone size={18} className="text-gray-500" />
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
          />
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-3.5">
          <FiLock size={18} className="text-gray-500" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-500"
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-3.5">
          <FiLock size={18} className="text-gray-500" />
          <input
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="text-gray-500"
          >
            {showConfirm ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        </div>

        {error && <p className="text-xs text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="h-12 w-full rounded-lg bg-green-700 text-sm font-semibold text-white disabled:opacity-60"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {/* Login link */}
      <p className="mt-6 text-center text-xs text-gray-500">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="font-semibold text-green-700"
        >
          Login
        </button>
      </p>
    </div>
  );
}

export default Register;
