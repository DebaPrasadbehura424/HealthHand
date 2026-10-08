import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiSettings,
  FiUser,
  FiLock,
  FiHelpCircle,
  FiInfo,
  FiLogOut,
  FiChevronRight,
  FiPhone,
} from "react-icons/fi";
import { useAuth } from "../context/AuthProvider";

const dummyPhoto = "https://i.pravatar.cc/200?img=12";

const menu = [
  { label: "Personal Information", icon: FiUser, path: "/personal-info" },
  { label: "Change Password", icon: FiLock, path: "/change-password" },
  { label: "Help & Support", icon: FiHelpCircle, path: "/help" },
  { label: "About HealthHand", icon: FiInfo, path: "/about" },
];

function Profile() {
  const navigate = useNavigate();
  const { user, loading, error, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
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

          {/* Menu list */}
          <section className="space-y-3">
            {menu.map((m) => (
              <button
                key={m.label}
                onClick={() => navigate(m.path)}
                className="flex w-full items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3.5 shadow-sm"
              >
                <m.icon size={20} className="text-gray-700" />
                <span className="flex-1 text-left text-sm font-medium text-gray-800">
                  {m.label}
                </span>
                <FiChevronRight size={18} className="text-gray-400" />
              </button>
            ))}

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
