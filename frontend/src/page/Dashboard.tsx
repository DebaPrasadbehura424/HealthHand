import { FiSearch, FiSliders, FiChevronRight } from "react-icons/fi";
import {
  FaTint,
  FaFlask,
  FaPoop,
  FaHome,
  FaCalendarCheck,
  FaFileMedical,
  FaCheckCircle,
} from "react-icons/fa";
import { GiButterfly } from "react-icons/gi";
import { MdOutlineVerified } from "react-icons/md";
import IconBox from "../component/IconBox";
import SectionHeader from "../component/SectionHeader";
import { useNavigate } from "react-router-dom";

const popularTests = [
  { label: "Blood Test", icon: FaTint, color: "#ef4444" },
  { label: "Urine Test", icon: FaFlask, color: "#f59e0b" },
  { label: "Stool Test", icon: FaPoop, color: "#92400e" },
  { label: "Thyroid Test", icon: GiButterfly, color: "#3b82f6" },
];

const quickActions = [
  { label: "Home", icon: FaHome, color: "#16a34a", nav: "/db" },
  {
    label: "Book Test",
    icon: FaCheckCircle,
    color: "#16a34a",
    nav: "/search_test",
  },
  {
    label: "My Bookings",
    icon: FaCalendarCheck,
    color: "#16a34a",
    nav: "/my_bookings",
  },
  {
    label: "Reports",
    icon: FaFileMedical,
    color: "#16a34a",
    nav: "/my_reports",
  },
];

const clinics = [
  {
    id: 1,
    name: "CityCare Diagnostic Centre",
    distance: "1.2 km",
    price: 199,
    image: "https://picsum.photos/seed/clinic1/200/200",
  },
];

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6 px-4 py-4">
      {/* Banner */}
      <section className="flex items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-r from-green-50 to-green-100 p-4">
        <div className="max-w-[60%]">
          <h2 className="text-xl font-bold leading-tight text-green-800">
            Good Health Starts with Regular Tests
          </h2>
          <p className="mt-2 text-[11px] text-gray-600">
            Book lab tests from nearby registered clinics and hospitals.
          </p>
        </div>
        <img
          src="https://picsum.photos/seed/banner/200/200"
          alt="banner"
          className="h-28 w-28 rounded-xl object-cover"
        />
      </section>

      {/* Search */}
      <section className="flex items-center gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-3">
          <FiSearch size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search for tests, clinics or hospitals..."
            className="w-full bg-transparent text-xs text-gray-700 outline-none placeholder:text-gray-400"
          />
        </div>
        <button className="rounded-xl border border-gray-200 bg-white p-3 text-gray-600">
          <FiSliders size={18} />
        </button>
      </section>

      {/* Popular Tests */}
      <section>
        <SectionHeader title="Popular Tests" onSeeAll={() => {}} />
        <div className="grid grid-cols-4 gap-2">
          {popularTests.map((t) => (
            <button key={t.label} className="flex flex-col items-center gap-2">
              <IconBox
                icon={t.icon}
                color={t.color}
                bgColor={t.color}
                width={56}
                height={56}
                size={24}
              />
              <span className="text-center text-[11px] font-medium text-gray-700">
                {t.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Nearby Clinics */}
      <section>
        <SectionHeader title="Nearby Clinics & Hospitals" onSeeAll={() => {}} />
        <div className="space-y-3">
          {clinics.map((c) => (
            <div
              key={c.id}
              className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm"
            >
              <img
                src={c.image}
                alt={c.name}
                className="h-16 w-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900">
                  {c.name}
                </h3>
                <p className="mt-0.5 flex items-center gap-1 text-[11px] text-gray-500">
                  {c.distance} •
                  <MdOutlineVerified className="text-green-600" />
                  <span className="text-green-700">Verified</span>
                </p>
                <p className="mt-0.5 text-[11px] text-gray-500">
                  Starts from{" "}
                  <span className="font-semibold text-gray-900">
                    ₹{c.price}
                  </span>
                </p>
              </div>
              <FiChevronRight className="text-gray-400" />
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <SectionHeader title="Quick Actions" />
        <div className="grid grid-cols-4 gap-2">
          {quickActions.map((t) => (
            <button
              key={t.label}
              className="flex flex-col items-center gap-2"
              onClick={() => navigate(`${t.nav}`)}
            >
              <IconBox
                icon={t.icon}
                color={t.color}
                bgColor={t.color}
                width={56}
                height={56}
                size={24}
              />
              <span className="text-center text-[11px] font-medium text-gray-700">
                {t.label}
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
