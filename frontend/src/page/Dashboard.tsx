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
import { useNavigate } from "react-router-dom";
import IconBox from "../component/IconBox";
import SectionHeader from "../component/SectionHeader";
import { useAuth } from "../context/AuthProvider";

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

// default user location (Bhubaneswar)
const userLat = 20.3547;
const userLng = 85.8196;

// Haversine formula: distance in km (hook nahi hai, bahar rakh sakte hain)
const getDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
) => {
  const R = 6371;
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

function Dashboard() {
  const navigate = useNavigate();
  const { clinics } = useAuth(); // hook component ke andar

  // distance add karo, nearest pehle, 3 rakho
  const nearestClinics = clinics
    .map((c) => ({
      ...c,
      distance: getDistance(userLat, userLng, c.lat, c.lng),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 3);

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
        <SectionHeader
          title="Popular Tests"
          onSeeAll={() => navigate("/search_test")}
        />
        <div className="grid grid-cols-4 gap-2">
          {popularTests.map((t) => (
            <button
              key={t.label}
              onClick={() => navigate("/search_test")}
              className="flex flex-col items-center gap-2"
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

      {/* Nearby Clinics */}
      <section>
        <SectionHeader
          title="Nearby Clinics & Hospitals"
          onSeeAll={() => navigate("/all_clinic_test")}
        />
        <div className="space-y-3">
          {nearestClinics.map((c) => {
            const startsFrom = c.tests.length
              ? Math.min(...c.tests.map((t) => t.price))
              : null;

            return (
              <div
                key={c._id}
                onClick={() =>
                  navigate("/clinic_details", { state: { id: c._id } })
                }
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm"
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

                  <p className="mt-0.5 text-[11px] text-gray-500">
                    {c.distance.toFixed(1)} km • {c.type}
                  </p>

                  <p className="mt-0.5 flex items-center gap-1 text-[11px]">
                    <MdOutlineVerified
                      className={
                        c.isVerified ? "text-green-600" : "text-gray-400"
                      }
                    />
                    <span
                      className={
                        c.isVerified ? "text-green-700" : "text-gray-500"
                      }
                    >
                      {c.isVerified ? "Verified" : "Not Verified"}
                    </span>
                  </p>

                  {startsFrom !== null && (
                    <p className="mt-0.5 text-[11px] text-gray-500">
                      Starts from{" "}
                      <span className="font-semibold text-gray-900">
                        ₹{startsFrom}
                      </span>
                    </p>
                  )}
                </div>
                <FiChevronRight className="text-gray-400" />
              </div>
            );
          })}

          {nearestClinics.length === 0 && (
            <p className="py-4 text-center text-xs text-gray-400">
              No clinics found
            </p>
          )}
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
              onClick={() => navigate(t.nav)}
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
