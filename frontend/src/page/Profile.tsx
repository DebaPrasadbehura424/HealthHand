import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiSettings,
  FiUser,
  FiLock,
  FiHelpCircle,
  FiInfo,
  FiLogOut,
  FiChevronDown,
  FiPhone,
  FiMail,
} from "react-icons/fi";
import { useAuth } from "../context/AuthProvider";
import api from "../api/api";

const dummyPhoto = "https://i.pravatar.cc/200?img=12";

type Section = "personal" | "password" | "help" | "about";

const menu: { key: Section; label: string; icon: typeof FiUser }[] = [
  { key: "personal", label: "Personal Information", icon: FiUser },
  { key: "password", label: "Change Password", icon: FiLock },
  { key: "help", label: "Help & Support", icon: FiHelpCircle },
  { key: "about", label: "About HealthHand", icon: FiInfo },
];

function Profile() {
  const navigate = useNavigate();
  const { user, loading, error, logout } = useAuth();

  const [openKey, setOpenKey] = useState<Section | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwMsg, setPwMsg] = useState("");
  const [pwError, setPwError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleLogout = () => {
    localStorage.clear(); // local storage poora khali
    logout();
    navigate("/");
  };

  const handleChangePassword = async () => {
    setPwMsg("");
    setPwError("");

    if (!newPassword || !confirmPassword) {
      setPwError("Please fill both fields");
      return;
    }
    if (newPassword.length < 6) {
      setPwError("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwError("Passwords do not match");
      return;
    }

    try {
      setSaving(true);
      // backend: PUT /api/users/change-password
      await api.put("/users/change-password", { newPassword });
      setPwMsg("Password changed successfully");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setPwError(err.response?.data?.message || "Could not change password");
    } finally {
      setSaving(false);
    }
  };

  const renderBody = (key: Section) => {
    if (!user) return null;

    if (key === "personal") {
      return (
        <div className="space-y-3 text-xs text-gray-700">
          <p className="flex items-center gap-2">
            <FiUser size={14} className="text-gray-500" />
            <span className="text-gray-500">Name:</span>
            <span className="font-medium text-gray-900">{user.fullName}</span>
          </p>
          <p className="flex items-center gap-2">
            <FiMail size={14} className="text-gray-500" />
            <span className="text-gray-500">Email:</span>
            <span className="font-medium text-gray-900">{user.email}</span>
          </p>
          <p className="flex items-center gap-2">
            <FiPhone size={14} className="text-gray-500" />
            <span className="text-gray-500">Phone:</span>
            <span className="font-medium text-gray-900">{user.phone}</span>
          </p>
        </div>
      );
    }

    if (key === "password") {
      return (
        <div className="space-y-3">
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-xs text-gray-700 outline-none placeholder:text-gray-400"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-xs text-gray-700 outline-none placeholder:text-gray-400"
          />
          {pwError && <p className="text-xs text-red-500">{pwError}</p>}
          {pwMsg && <p className="text-xs text-green-700">{pwMsg}</p>}
          <button
            onClick={handleChangePassword}
            disabled={saving}
            className="h-10 w-full rounded-lg bg-green-700 text-xs font-semibold text-white disabled:opacity-60"
          >
            {saving ? "Saving..." : "Change Password"}
          </button>
        </div>
      );
    }

    if (key === "help") {
      return (
        <p className="text-xs leading-relaxed text-gray-600">
          Need help with a booking, a report or your account? Write to us at
          support@healthhand.com or call 1800-000-000 (9 AM to 8 PM). We usually
          reply within 24 hours.
        </p>
      );
    }

    return (
      <p className="text-xs leading-relaxed text-gray-600">
        HealthHand helps you find nearby clinics and hospitals, book lab tests
        with home sample collection or lab visits, and get your reports in one
        place. Your health, our priority. Version 1.0.
      </p>
    );
  };

  return (
    <div>
      <div className="sticky top-0 z-20 flex items-center justify-between bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-800">
            <FiArrowLeft size={22} />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Profile</h1>
        </div>
        <button className="text-gray-700">
          <FiSettings size={20} />
        </button>
      </div>

      {loading && (
        <p className="py-20 text-center text-sm text-gray-400">
          Loading profile...
        </p>
      )}

      {!loading && error && (
        <p className="py-20 text-center text-sm text-red-500">{error}</p>
      )}

      {!loading && !error && user && (
        <div className="space-y-6 px-4 pb-4">
          {/* Avatar, name, email, phone */}
          <section className="flex flex-col items-center pt-2">
            <img
              src={user.photo || dummyPhoto}
              alt={user.fullName}
              onError={(e) => {
                e.currentTarget.src = dummyPhoto;
              }}
              className="h-24 w-24 rounded-full border-4 border-green-100 object-cover"
            />
            <h2 className="mt-3 text-lg font-bold text-gray-900">
              {user.fullName}
            </h2>
            <p className="text-xs text-gray-500">{user.email}</p>
            <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
              <FiPhone size={12} />
              {user.phone}
            </p>
          </section>

          {/* Dropdown menu */}
          <section className="space-y-3">
            {menu.map((m) => {
              const isOpen = openKey === m.key;
              return (
                <div
                  key={m.key}
                  className="rounded-xl border border-gray-100 bg-white shadow-sm"
                >
                  <button
                    onClick={() => setOpenKey(isOpen ? null : m.key)}
                    className="flex w-full items-center gap-3 px-4 py-3.5"
                  >
                    <m.icon size={20} className="text-gray-700" />
                    <span className="flex-1 text-left text-sm font-medium text-gray-800">
                      {m.label}
                    </span>
                    <FiChevronDown
                      size={18}
                      className={`text-gray-400 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t border-gray-100 px-4 py-4">
                      {renderBody(m.key)}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3.5 shadow-sm"
            >
              <FiLogOut size={20} className="text-red-500" />
              <span className="flex-1 text-left text-sm font-medium text-red-500">
                Logout
              </span>
            </button>
          </section>
        </div>
      )}
    </div>
  );
}

export default Profile;
