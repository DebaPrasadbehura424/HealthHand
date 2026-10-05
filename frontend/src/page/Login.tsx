import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { FaHeartbeat } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import api from "../api/api";

function Login() {
  const navigate = useNavigate();

  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailOrPhone || !password) {
      setError("Please enter email/phone and password");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const { data } = await api.post("/auth/login", {
        emailOrPhone,
        password,
      });

      // save token + user for the protected APIs
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/db");
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-col px-6 py-10">
      {/* Logo */}
      <div className="mt-6 flex flex-col items-center">
        <div className="flex items-center gap-2">
          <FaHeartbeat size={34} className="text-green-700" />
          <h1 className="text-3xl font-bold text-green-700">HealthHand</h1>
        </div>
        <p className="mt-1 text-[11px] text-gray-500">
          Your Health, Our Priority
        </p>
      </div>

      {/* Heading */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Welcome Back!</h2>
        <p className="mt-1 text-xs text-gray-500">
          Login to book tests, find labs and get your reports.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="mt-6 space-y-4">
        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-3.5">
          <FiMail size={18} className="text-gray-500" />
          <input
            type="text"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            placeholder="Email or Phone Number"
            className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
          />
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-3.5">
          <FiLock size={18} className="text-gray-500" />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

        {error && <p className="text-xs text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="h-12 w-full rounded-lg bg-green-700 text-sm font-semibold text-white disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="text-center">
          <button type="button" className="text-xs font-medium text-green-700">
            Forgot Password?
          </button>
        </div>
      </form>

      {/* OR divider */}
      <div className="my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-gray-200" />
        <span className="text-xs text-gray-400">OR</span>
        <span className="h-px flex-1 bg-gray-200" />
      </div>

      {/* Google */}
      <button
        type="button"
        className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-800"
      >
        <FcGoogle size={20} />
        Continue with Google
      </button>

      {/* Register link */}
      <p className="mt-6 text-center text-xs text-gray-500">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={() => navigate("/auth_register")}
          className="font-semibold text-green-700"
        >
          Register
        </button>
      </p>
    </div>
  );
}

export default Login;
