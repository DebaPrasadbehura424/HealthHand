import { NavLink } from "react-router-dom";
import { FiHome, FiCalendar, FiFileText, FiUser } from "react-icons/fi";
import type { IconType } from "react-icons";

interface Tab {
  label: string;
  path: string;
  icon: IconType;
}

const tabs: Tab[] = [
  { label: "Home", path: "/", icon: FiHome },
  { label: "Bookings", path: "/bookings", icon: FiCalendar },
  { label: "Reports", path: "/reports", icon: FiFileText },
  { label: "Profile", path: "/profile", icon: FiUser },
];

const BottomBar = () => {
  return (
    <nav className="sticky bottom-0 z-30 border-t border-gray-100 bg-white px-2 py-2">
      <ul className="flex items-center justify-around">
        {tabs.map(({ label, path, icon: Icon }) => (
          <li key={label}>
            <NavLink
              to={path}
              end={path === "/"}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-3 py-1 text-[11px] font-medium ${
                  isActive ? "text-green-700" : "text-gray-400"
                }`
              }
            >
              <Icon size={22} />
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomBar;
