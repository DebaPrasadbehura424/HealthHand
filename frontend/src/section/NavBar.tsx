import { FiBell } from "react-icons/fi";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, fetchUser } = useAuth();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
      return;
    }
    fetchUser();
  }, [fetchUser, navigate]);

  const hasNotification = true;

  return (
    <header className="sticky top-0 z-30 bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left: greeting + description */}
        <div>
          <h1 className="text-lg font-bold text-gray-900">
            Hello, {user?.fullName} <span className="inline-block">👋</span>
          </h1>
          <p className="text-xs text-gray-500">
            Find the right test, at the right place.
          </p>
        </div>

        {/* Right: bell + profile */}
        <div className="flex items-center gap-3">
          <button className="relative p-1 text-gray-700">
            <FiBell size={22} />
            {hasNotification && (
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            )}
          </button>

          <img
            src={user?.photo}
            alt="profile"
            className="h-10 w-10 rounded-full border border-gray-200 object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
